import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { addToWatchlist, removeFromWatchlist } from '../../redux/watchlistSlice'
import {
    CardDetails, CardTitle, CardDescription, AddToWatchlistTitle, AddToWatchlist
} from '../common/sharedCardTrayStyles'

function CardDetail({ details, orientation, targetUrl }) {
    const [data, setData] = useState(null);
    const [inWatchlist, setInWatchlist] = useState(false)
    const [descriptionLength, setDescriptionLength] = useState(68);

    const watchlistItems = useSelector((state) => state.watchlist.items);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (orientation === "vertical") {
            setDescriptionLength(48);
        }
    }, [orientation])

    useEffect(() => {
        if (details && details.contentType) {
            let _data = {
                id: details.id,
                contentType: details.contentType,
                title: details.title,
                titleClean: details.titleClean,
                description: details.description,
                premium: details.premium,
                images: details.images
            }

            switch (details.contentType) {
                case "movie":
                    _data.subInfo = [details.genre, details.yearOfRelease, details.channelName];
                    break;
                case "show":
                    _data.subInfo = [details.genre, details.language, details.channelName];
                    break;
                default:
                    break;
            }
            setData(_data);
        }
    }, [details])

    useEffect(() => {
        if (data && data.id && watchlistItems) {
            let isInWatchlist = watchlistItems.find(x => x.id === parseInt(data.id));
            if (isInWatchlist) {
                setInWatchlist(true);
            } else {
                setInWatchlist(false);
            }
        }
    }, [data, watchlistItems])

    const handleWatchMovieClick = ({ e, url }) => {
        e.preventDefault();
        history.push(`${targetUrl}/watch`)
    }

    const handleWatchlistBtnClick = ({ e, data }) => {
        e.preventDefault();
        e.stopPropagation();

        if (inWatchlist) {
            dispatch(removeFromWatchlist({ id: data.id }));
            setInWatchlist(false);
        } else {
            dispatch(addToWatchlist({ data }))
            setInWatchlist(true);
        }
    }

    return (
        <Fragment>
            {!data || data === null ? (<></>) : (
                <CardDetails className="card-details">
                    <CardTitle>{data.title ? data.title : <></>}</CardTitle>
                    {orientation === "vertical" && data.subInfo && data.subInfo.length > 0 ? (
                        <SubInfo><p>{data.subInfo.join(', ')}</p></SubInfo>
                    ) : (<></>)}
                    {data.description && (data.contentType === "movie" || data.contentType === "show") ? (
                        <CardDescription>{data.description.slice(0, descriptionLength).trim()}...</CardDescription>
                    ) : (<></>)}
                    <Actions>
                        {data.contentType === "movie" &&
                            <AddToWatchlist onClick={(e) => handleWatchMovieClick({ e, url: data.targetUrl })}>
                                <i className="fas fa-play"></i>
                                <AddToWatchlistTitle>Watch Movie</AddToWatchlistTitle>
                            </AddToWatchlist>
                        }
                        {data.contentType === "movie" || data.contentType === "show" || data.contentType === "episode" ? (
                            <AddToWatchlist onClick={(e) => { handleWatchlistBtnClick({ e, data }) }}>
                                {!inWatchlist ? (
                                    <Fragment>
                                        <i className="fas fa-plus"></i>
                                        <AddToWatchlistTitle>Add to Watchlist</AddToWatchlistTitle>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <i className="fas fa-check" style={{ color: "#1f80e0" }}></i>
                                        <AddToWatchlistTitle>Added to Watchlist</AddToWatchlistTitle>
                                    </Fragment>
                                )}
                            </AddToWatchlist>
                        ) : (<></>)}
                    </Actions>
                </CardDetails>
            )}
        </Fragment>
    )
}

export default CardDetail

const SubInfo = styled.div`
    font-size: 0.6rem;
    margin-top: 2px;
    color: rgba(255,255,255,1);
`

const Actions = styled.div``