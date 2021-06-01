import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { addToWatchlist, removeFromWatchlist } from '../../redux/watchlistSlice'
import useFetch from '../../customHooks/useFetch'
import {
    SliderItem, SliderContentLink, SliderImg, ImageGradient, SliderCaption,
    Title, Meta, MetaItem, Description, MovieDetailContainer, MovieInfo, MovieActions, PrimaryActions,
    WatchMovieAction, SecondaryActions, AddToWatchlistAction, ShareAction
} from '../common/sharedSliderStyles';
import MediaRelatedContent from '../relatedContent/MediaRelatedContent';
import ContentTray from '../trayAndCards/ContentTray';

function TvDetail() {
    const [show, setShow] = useState({});
    const [inWatchlist, setInWatchlist] = useState(false);

    const watchlistItems = useSelector((state) => state.watchlist.items);

    const { show_id } = useParams();
    const dispatch = useDispatch();

    const { data: showData, isPending, error } = useFetch(`/api/shows/${show_id}`) //eslint-disable-line
    const { data: seasonsData } = useFetch(`/api/shows/${show_id}/seasons`) //eslint-disable-line
    const { data: episodesData } = useFetch(`/api/shows/${show_id}/episodes`) //eslint-disable-line

    useEffect(() => {
        if (showData && seasonsData && episodesData) {
            let seasonCount = seasonsData.seasons.items.length ? seasonsData.seasons.items.length : 0;
            let episodeCount = episodesData.episodes.items.length ? episodesData.episodes.items.length : 0;

            setShow({ ...showData.show, seasonCount, episodeCount });
        }
    }, [showData, seasonsData, episodesData]) //eslint-disable-line

    useEffect(() => {
        if (show && show.id && watchlistItems) {
            let isInWatchlist = watchlistItems.find(x => x.id === parseInt(show.id));
            if (isInWatchlist) {
                setInWatchlist(true);
            } else {
                setInWatchlist(false);
            }
        }
    }, [show, watchlistItems])

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
        <TvDetailContainer>
            <SliderItem>
                {show && show.id && show.id !== "" && show.title !== "" ? (
                    <SliderContentLink to={"/tv/" + show.titleClean + "/" + show.id + "/watch/se/1/ep/1"}>
                        <SliderCaption>
                            <TvInfo>
                                <Title>{show.title}</Title>
                                <Meta>
                                    {show.seasonCount && parseInt(show.seasonCount) > 0 ? <MetaItem>{`${show.seasonCount} Seasons`}</MetaItem> : <></>}
                                    {show.episodeCount && parseInt(show.episodeCount) > 0 ? <MetaItem>{`${show.episodeCount} Episodes`}</MetaItem> : <></>}
                                    {show.genre && show.genre !== "" && <MetaItem>{show.genre}</MetaItem>}
                                    {show.censorRating && show.censorRating !== "" && <MetaItem>{show.censorRating}</MetaItem>}
                                    {show.channelName && show.channelName !== "" && <MetaItem>{show.channelName}</MetaItem>}
                                </Meta>
                                <Description>{show.description}</Description>
                            </TvInfo>
                            <TvActions>
                                <PrimaryActions>
                                    <WatchTvAction>
                                        <i className="fas fa-play"></i>
                                        <h2>Watch First Episode</h2>
                                    </WatchTvAction>
                                </PrimaryActions>
                                <SecondaryActions>
                                    <AddToWatchlistAction
                                        onClick={(e) => { handleWatchlistBtnClick({ e, data: show }) }}
                                    >
                                        {inWatchlist ? (<i className="fas fa-check"></i>) : (<i className="fas fa-plus"></i>)}
                                        <h5>Watchlist</h5>
                                    </AddToWatchlistAction>
                                    <ShareAction>
                                        <i className="fas fa-share-alt"></i>
                                        <h5>Share</h5>
                                    </ShareAction>
                                </SecondaryActions>
                            </TvActions>
                        </SliderCaption>
                        {show.images && show.images.b && show.images.b !== "" && (
                            <SliderImg>
                                <img src={show.images.b} alt={show.title_clean} />
                                <ImageGradient />
                            </SliderImg>
                        )}
                    </SliderContentLink>
                ) : (<></>)}
            </SliderItem>
            <div style={{ marginTop: 30 }}>
                {episodesData && episodesData.episodes && episodesData.episodes.items.length > 0 ? (
                    <ContentTray trayDetail={episodesData.episodes} />
                ) : (<></>)}
            </div>
            <div style={{ marginTop: 30 }}>
                {seasonsData && seasonsData.seasons && seasonsData.seasons.items.length > 0 ? (
                    <ContentTray trayDetail={seasonsData.seasons} />
                ) : (<></>)}
            </div>
            {show_id ? (<MediaRelatedContent contentId={show_id} contentType="show" />) : (<></>)}
        </TvDetailContainer>
    )
}

export default TvDetail


const TvDetailContainer = styled(MovieDetailContainer)``

const TvInfo = styled(MovieInfo)``

const TvActions = styled(MovieActions)``

const WatchTvAction = styled(WatchMovieAction)``