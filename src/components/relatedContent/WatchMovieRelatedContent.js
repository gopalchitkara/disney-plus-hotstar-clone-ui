import React, { useEffect, useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components/macro'
import ReactPlayer from 'react-player';
import ContentTray from '../trayAndCards/ContentTray';
import {
    WatchContentContainer, WatchAreaContainer, WatchArea, LoadingContent,
    ContentDetailWrapper, ContentDetailContainer, Meta, MetaItem
} from '../common/sharedStyles'

function WatchMovieRelatedContent() {
    const [movie, setMovie] = useState({})
    const [watchMovie, setWatchMovie] = useState({})
    const [playbackUrl, setPlaybackUrl] = useState("")
    const { parent_content_type, parent_content_id, content_type, content_id } = useParams();
    const history = useHistory();

    const { data: contentData, isPending: isContentPending, error: contentError } =
        useFetch(`/api/${content_type}s/${content_id}`) //eslint-disable-line

    const { data: relatedData, isPending: isRelatedPending, error: relatedError }
        = useFetch(`/api/${parent_content_type}s/${parent_content_id}/related-content/${content_type}s/${content_id}`) //eslint-disable-line

    // useEffect(() => {
    //     let item = {};
    //     switch (content_type) {
    //         case 'trailer':
    //             item = trailers.find(el => el.id === parseInt(content_id));
    //             break;
    //         case 'extra':
    //             item = extras.find(el => el.id === parseInt(content_id));
    //             break;
    //         case 'bonus':
    //             item = bonus_content.find(el => el.id === parseInt(content_id));
    //             break;
    //         default:
    //             break;
    //     }

    //     if (item && item.playback_url && item.playback_url !== "") {
    //         setPlaybackUrl(item.playback_url);
    //     } else {
    //         history.push("/not-found");
    //     }
    // }, [content_id, content_type]) //eslint-disable-line

    // useEffect(() => {
    //     let _movie = movies.find(el => el.id === parseInt(movie_id));
    //     setMovie(_movie);

    //     let _watchMovie = {
    //         id: 1,
    //         title: "Watch Now",
    //         items: [{
    //             id: _movie.id,
    //             content_type: _movie.content_type,
    //             title: _movie.title,
    //             title_clean: _movie.title_clean,
    //             thumbnail_url: _movie.images.b,
    //             target_url: `/movie/${_movie.title_clean}/${_movie.id}/watch`
    //         }],
    //         orientation: "horizontal"
    //     }
    //     setWatchMovie(_watchMovie);
    // }, [movie_id])

    return (
        <WatchContentContainer>
            <WatchAreaContainer>
                {/* <WatchArea>
                    {playbackUrl && playbackUrl !== "" ? (
                        <ReactPlayer
                            controls
                            playing={true}
                            url={playbackUrl}
                            width='100%'
                            height='100%'
                        />
                    ) : (<>loading...</>)}
                </WatchArea> */}
            </WatchAreaContainer>
            <ContentDetailWrapper>
                {/* <ContentDetailContainer>
                    <h2><Link to={`/movie/${movie.title_clean}/${movie.id}`}>{movie.title}</Link></h2>
                    <Meta>
                        {movie.genre !== "" ? <MetaItem>{movie.genre}</MetaItem> : <></>}
                        {movie.censor_rating !== "" ? <MetaItem>{movie.censor_rating}</MetaItem> : <></>}
                        {movie.channel_name !== "" ? <MetaItem>{movie.channel_name}</MetaItem> : <></>}
                    </Meta>
                    <p>{movie.description}</p>
                    {watchMovie.items && watchMovie.items.length > 0 &&
                        <WatchNowContainer>
                            <ContentTray trayDetail={watchMovie} />
                        </WatchNowContainer>
                    }
                </ContentDetailContainer> */}
            </ContentDetailWrapper>
        </WatchContentContainer>
    )
}

export default WatchMovieRelatedContent

const WatchNowContainer = styled.div`
    padding-top: 15px;
`