import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import useFetch from '../../customHooks/useFetch';
import { removeFromCurrentlyWatching, updateTimeWatched } from '../../redux/currentlyWatchingSlice'
import {
    VerticalCardWrapper, VerticalImageContainer, CardContent, CardTitle,
    CardDescription, CardThumbnail
} from '../common/sharedCardTrayStyles'


function CurrentlyWatchingCard({ details }) {
    const [content, setContent] = useState(null);
    const [targetUrl, setTargetUrl] = useState(null)

    const dispatch = useDispatch();
    const history = useHistory();

    const { data, isPending } = useFetch(`/api/${details.contentType}s/${details.contentId}`)

    useEffect(() => {
        if (data) {
            if (details.contentType === "movie")
                setContent(data.movie);
            else if (details.contentType === "episode")
                setContent(data.episode);
        }
    }, [details, data])

    useEffect(() => {
        if (content && content !== null) {
            switch (content.contentType) {
                case "movie":
                    setTargetUrl(`/movie/${content.titleClean}/${content.id}/watch`)
                    break;
                case "episode":
                    setTargetUrl(`/tv/${content.showTitleClean}/${content.showId}/watch/se/${content.seasonNumber}/ep/${content.episodeNumber}`)
                    break;
                default:
                    setTargetUrl(null);
                    break;
            }
        }
    }, [content])

    const handlePlayBeginningClick = ({ e, id, url }) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(updateTimeWatched({
            contentId: id,
            timeWatched: 0
        }));
        history.push(`${url}`)
    }

    const handleSeeAllEpisodes = ({ e, showId, titleClean, seasonNumber }) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/tv/${titleClean}/${showId}/list/season/${seasonNumber}`)
    }

    const handleRemoveClick = ({ e, id }) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(removeFromCurrentlyWatching({ contentId: id }))
    }

    return (
        <VerticalCardWrapper>
            {!content || isPending || targetUrl === null ? (
                <CardContent>
                    <CardThumbnail>
                        <VerticalImageContainer />
                    </CardThumbnail>
                </CardContent>
            ) : (
                <CardContentCustom>
                    <Link to={targetUrl}>
                        <CardThumbnail>
                            <VerticalImageContainer style={{ backgroundImage: `url("${content.images.h}")` }} />
                        </CardThumbnail>
                        {content.contentType === "episode" &&
                            <EpisodeTitle><p>{content.title}</p></EpisodeTitle>
                        }
                        <CardData className="card-data">
                            <CardTitle>{content.title}</CardTitle>
                            {content.description && <CardDescription>{content.description.slice(0, 68).trim()}...</CardDescription>}
                            <Actions>
                                {content.contentType === "movie" &&
                                    <PlayFromBeginning onClick={(e) => handlePlayBeginningClick({ e, id: content.id, url: targetUrl })}>
                                        <i className="fas fa-step-backward"></i>
                                        <AddTitle>Play from beginning</AddTitle>
                                    </PlayFromBeginning>
                                }
                                {content.contentType === "episode" && content.showId &&
                                    <SeeAllEpisodes onClick={(e) => handleSeeAllEpisodes({ e, showId: content.showId, titleClean: content.showTitleClean, seasonNumber: content.seasonNumber })}>
                                        <i className="fas fa-bars"></i>
                                        <AddTitle>See all episodes</AddTitle>
                                    </SeeAllEpisodes>
                                }
                            </Actions>
                        </CardData>
                        <RemoveButton className="card-data">
                            <i onClick={(e) => handleRemoveClick({ e, id: content.id })} className="fas fa-trash"></i>
                        </RemoveButton>
                    </Link>
                    <ProgressBar />
                    <ProgressBarCovered style={{ width: `${(details.timeWatched / details.duration) * 100}%` }} />
                </CardContentCustom>
            )}
        </VerticalCardWrapper>
    )
}

export default CurrentlyWatchingCard

const CardContentCustom = styled(CardContent)`

    &:hover {
        .card-data {
            opacity: 1;
        }
    }
`

const EpisodeTitle = styled.div`
    display: inline-block;
    position: absolute ;
    left: 0;
    bottom: 0;
    padding: 38px 12px 10px 12px;
    width: 100%;
    background-image: linear-gradient(to bottom, rgba(4,8,15,0), rgba(4,8,15,0), #192133);

    p {
        font-size: 0.9rem;
        font-weight: 500;
        color: rgba(255,255,255,1);
    }
`

const RemoveButton = styled.div`
    display: block;
    opacity: 0;
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
    z-index: 8;
    transition: opacity .25s cubic-bezier(0.33, 0.04, 0.63, 0.93);

    i {
        color: rgba(255, 60, 56,1);
        float: right;
        margin-top: 2px;
        margin-right: 2px;
        padding: 5px;
        font-size: 0.6rem;
    }
`

const CardData = styled.div`
    display: block;
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 38px 12px 10px 12px;
    background-image: linear-gradient(to bottom, rgba(4,8,15,0), #192133, #192133);
    color: rgba(255,255,255,0.7);
    transition: opacity .25s cubic-bezier(0.33, 0.04, 0.63, 0.93);
`

const Actions = styled.div`
`

const PlayFromBeginning = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 2px;
    align-items: center;
    margin-top: 2px;
    padding: 4px;
    align-items: center;

    i {
        font-size: 0.5rem;
        line-height: 1.2;
    }

    span {
        line-height: 1;
    }

    &:hover {
        background: rgba(255,255,255,0.1);
    }
`

const SeeAllEpisodes = styled(PlayFromBeginning)``

const AddTitle = styled.span`
    font-size: 0.6rem;
    margin-left: 10px;
`

const ProgressBar = styled.div`
    display: block;
    position: absolute;    
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 4px;
    background: #192133;
`

const ProgressBarCovered = styled.div`
    display: block;
    position: absolute;    
    bottom: 0;
    left: 0;
    z-index: 12;
    height: 4px;
    background: #1f80e0;
`
