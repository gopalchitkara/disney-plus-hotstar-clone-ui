import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CardDetail from './CardDetail'
import {
    VerticalCardWrapper, VerticalImageContainer, HorizontalCardWrapper, HorizontalImageContainer,
    CardContent, CardThumbnail
} from '../common/sharedCardTrayStyles'

function Card({ item, orientation }) {
    const [details, setDetails] = useState(null)
    const [targetUrl, setTargetUrl] = useState(null)

    // useEffect(() => {
    //     console.log({ item })
    // }, [item])

    // useEffect(() => {
    //     console.log({ targetUrl })
    // }, [targetUrl])

    useEffect(() => {
        if (item && item.contentType && item.contentType !== "") {
            switch (item.contentType) {
                case "movie":
                    setTargetUrl(`/movie/${item.titleClean}/${item.id}`)
                    break;
                case "show":
                    setTargetUrl(`/tv/${item.titleClean}/${item.id}`)
                    break;
                case "season":
                    setTargetUrl(`/tv/${item.parentTitleClean}/${item.showId}/list/season/${item.seasonNumber}`)
                    break;
                case "episode":
                    setTargetUrl(`/tv/${item.parentTitleClean}/${item.showId}/watch/se/${item.seasonNumber}/ep/${item.episodeNumber}`)
                    break;
                case "trailer":
                case "extra":
                case "bonus":
                    if (item.parentContentType && item.parentContentType !== "" && item.parentContentId)
                        setTargetUrl(`/${item.parentContentType}/${item.parentTitleClean}/${item.parentContentId}/related-content/${item.contentType}/${item.id}`)
                    else
                        setTargetUrl(null)
                    break;
                default:
                    console.log(`Horizontal card: target url not found for: ${item.id} ${item.contentType}`)
                    setTargetUrl(null)
                    break;
            };

            setDetails(item);
        }
    }, [item])

    const CardContentContainer = () => {
        return (
            <CardContent>
                {!details || !targetUrl ? (
                    <CardThumbnail>
                        {orientation && orientation === "horizontal" ? (
                            <HorizontalImageContainer />
                        ) : (
                            <VerticalImageContainer />
                        )}
                    </CardThumbnail>
                ) : (
                    <Fragment>
                        {targetUrl === null ? (<></>) : (
                            <Link to={targetUrl}>
                                <CardThumbnail>
                                    <CardThumbnail>
                                        {orientation && orientation === "horizontal" ? (
                                            <HorizontalImageContainer style={{ backgroundImage: `url("${details.images.h}")` }} />
                                        ) : (
                                            <VerticalImageContainer style={{ backgroundImage: `url("${details.images.v}")` }} />
                                        )}
                                    </CardThumbnail>
                                </CardThumbnail>
                                <CardDetail details={details} orientation={"vertical"} targetUrl={targetUrl} />
                            </Link>
                        )}
                    </Fragment>
                )}
            </CardContent>
        )
    }

    return (
        <Fragment>
            {orientation && orientation === "horizontal" ? (
                <HorizontalCardWrapper><CardContentContainer /></HorizontalCardWrapper>
            ) : (
                <VerticalCardWrapper><CardContentContainer /></VerticalCardWrapper>
            )}
        </Fragment >
    )
}

export default Card