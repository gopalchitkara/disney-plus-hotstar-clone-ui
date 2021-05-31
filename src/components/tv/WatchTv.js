import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { MainContainer } from '../common/sharedStyles'
import { useSelector, useDispatch } from 'react-redux'
import { addToCurrentlyWatching, updateTimeWatched } from '../../redux/currentlyWatchingSlice'
import useFetch from '../../customHooks/useFetch'
import { Fragment } from 'react'
import LockedContentScreen from '../authorization/LockedContentScreen'
import MediaRelatedContent from '../relatedContent/MediaRelatedContent'
import ContentTray from '../trayAndCards/ContentTray'
import {
    WatchContentContainer, WatchAreaContainer, WatchArea, LoadingContent,
    ContentDetailWrapper, ContentDetailContainer, Meta, MetaItem, RelatedContentContainer
} from '../common/sharedStyles'

function WatchTv() {
    const [episode, setEpisode] = useState({});
    const [startTime, setStartTime] = useState(0)

    const currentlyWatchingItems = useSelector((state) => state.currentlyWatching.items);
    const userDetail = useSelector((state) => state.auth.userDetail);

    const { show_id, season_no, episode_no } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const { data: episodeData, isPending: isEpisodePending } = useFetch(`/api/shows/${show_id}/seasons/${season_no}/episode/${episode_no}`) //eslint-disable-line
    const { data: seasonsData } = useFetch(`/api/shows/${show_id}/seasons`) //eslint-disable-line
    const { data: episodesData } = useFetch(`/api/shows/${show_id}/episodes`) //eslint-disable-line

    useEffect(() => {
        if (!isEpisodePending && episodeData) {
            let isBeingWatched = currentlyWatchingItems.find(x => x.contentId === parseInt(episodeData.episode.id));
            if (isBeingWatched) {
                setStartTime(parseInt(isBeingWatched.timeWatched));
            }

            setEpisode(episodeData.episode)
            console.log({ episode: episodeData.episode })
        }
    }, [isEpisodePending, episodeData]) //eslint-disable-line

    const onProgress = ({ playedSeconds }) => {
        let timeWatched = parseInt(playedSeconds);

        if (episode && (timeWatched >= 0) && (timeWatched % 1 === 0)) {
            dispatch(updateTimeWatched({
                contentId: episode.id,
                timeWatched
            }));
        }
    };

    const onDuration = (duration) => {
        if (episode && duration && duration > 0) {
            dispatch(addToCurrentlyWatching({
                contentId: episode.id,
                contentType: episode.contentType,
                showId: episode.showId,
                duration
            }));
        }
    };

    return (
        <Fragment>
            {userDetail && !userDetail.isAuthorized ? (
                <LockedContentScreen />
            ) : (
                <WatchContentContainer>
                    <WatchAreaContainer>
                        <WatchArea>
                            {episode.id && episode.id !== "" ? (
                                <ReactPlayer
                                    controls
                                    playing={true}
                                    // url="https://www.youtube.com/watch?v=dvgZkm1xWPE#t=3m05s"}
                                    url={`${episode.playbackUrl}#t=${startTime}s`}
                                    width='100%'
                                    height='100%'
                                    onProgress={onProgress}
                                    onDuration={onDuration}
                                />
                            ) : (
                                <LoadingContent>
                                    <i className="fas fa-spinner fa-3x fa-spin"></i>
                                </LoadingContent>
                            )}
                        </WatchArea>
                    </WatchAreaContainer>
                    <ContentDetailWrapper>
                        {episode && episode.id !== "" ? (
                            <ContentDetailContainer>
                                <h2>{episode.showTitle}</h2>
                                <Meta>
                                    {episode.title !== "" && <MetaItem>{episode.title}</MetaItem>}
                                    {episode.seasonNumber !== "" && episode.episodeNumber !== "" && <MetaItem>{`S${episode.seasonNumber} E${episode.episodeNumber}`}</MetaItem>}
                                    {episode.showChannelName !== "" && <MetaItem>{episode.showChannelName}</MetaItem>}
                                    {episode.showCensorRating !== "" && <MetaItem>{episode.showCensorRating}</MetaItem>}
                                </Meta>
                                <p>{episode.description}</p>
                            </ContentDetailContainer>
                        ) : (<></>)}
                    </ContentDetailWrapper>
                    <RelatedContentContainer>
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
                        {episode && episode.showId ? (<MediaRelatedContent contentId={episode.showId} contentType="show" />) : (<></>)}
                    </RelatedContentContainer>
                </WatchContentContainer>
            )}
        </Fragment>
    )
}

export default WatchTv
