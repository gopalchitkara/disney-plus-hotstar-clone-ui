import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro';
import { removeFromWatchlist } from '../../redux/watchlistSlice'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    VerticalCardWrapper, VerticalImageContainer, CardContent, CardDetails, CardTitle,
    CardDescription, AddToWatchlist, AddToWatchlistTitle, CardThumbnail
} from '../common/sharedCardTrayStyles'

function WatchlistCard({ details }) {
    const [targetUrl, setTargetUrl] = useState(null)

    const dispatch = useDispatch();

    useEffect(() => {
        if (details && details !== null) {
            switch (details.contentType) {
                case "movie":
                    setTargetUrl(`/movie/${details.titleClean}/${details.id}`)
                    break;
                case "show":
                    setTargetUrl(`/tv/${details.titleClean}/${details.id}`)
                    break;
                case "episode":
                    setTargetUrl(`/tv/${details.showTitleClean}/${details.showId}/watch/se/${details.seasonNumber}/ep/${details.episodeNumber}`)
                    break;
                default:
                    setTargetUrl(null);
                    break;
            }
        }
    }, [details])

    const handleRemoveFromWLClick = ({ e, id }) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(removeFromWatchlist({ id }));
    }

    return (
        <VerticalCardWrapper>
            {!details || targetUrl === null ? (
                <CardContent>
                    <CardThumbnail>
                        <VerticalImageContainer />
                    </CardThumbnail>
                </CardContent>
            ) : (
                <CardContent>
                    <Link to={targetUrl}>
                        <CardThumbnail>
                            <VerticalImageContainer style={{ backgroundImage: `url("${details.images.v}")` }} />
                        </CardThumbnail>
                        {details.contentType === "episode" &&
                            <EpisodeTitle><p>{details.title}</p></EpisodeTitle>
                        }
                        <CardDetails className="card-details">
                            <CardTitle>{details.title}</CardTitle>
                            {details.description && <CardDescription>{details.description.slice(0, 68).trim()}...</CardDescription>}
                            <AddToWatchlist
                                onClick={(e) => { handleRemoveFromWLClick({ e, id: details.id }) }}
                            >
                                <i className="fas fa-check" style={{ color: "#1f80e0" }}></i>
                                <AddToWatchlistTitle>Remove from Watchlist</AddToWatchlistTitle>
                            </AddToWatchlist>
                        </CardDetails>
                    </Link>
                </CardContent>
            )}
        </VerticalCardWrapper>
    )
}

export default WatchlistCard

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