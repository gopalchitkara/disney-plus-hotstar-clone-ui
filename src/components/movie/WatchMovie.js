import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCurrentlyWatching, updateTimeWatched } from '../../redux/currentlyWatchingSlice'
import useFetch from '../../customHooks/useFetch'
import { Fragment } from 'react'
import LockedContentScreen from '../authorization/LockedContentScreen'
import MediaRelatedContent from '../relatedContent/MediaRelatedContent'
import {
    WatchContentContainer, WatchAreaContainer, WatchArea,
    ContentDetailWrapper, ContentDetailContainer, Meta, MetaItem, RelatedContentContainer
} from '../common/sharedStyles'
import LoadingScreen from '../LoadingScreen'

function WatchMovie() {
    const [movie, setMovie] = useState({});
    const [startTime, setStartTime] = useState(0);

    const currentlyWatchingItems = useSelector((state) => state.currentlyWatching.items);
    const userDetail = useSelector((state) => state.auth.userDetail);

    // console.log({ userDetail })

    const { movie_id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const { data: movieData, isPending, error } = useFetch(`/api/movies/${movie_id}`) //eslint-disable-line

    useEffect(() => {
        if (!isPending) {
            if (!movieData || !movieData.movie) history.push("/not-found");
            let isBeingWatched = currentlyWatchingItems.find(x => x.contentId === parseInt(movieData.movie.id));
            if (isBeingWatched) {
                setStartTime(parseInt(isBeingWatched.timeWatched));
            }

            setMovie(movieData.movie);
        }
    }, [isPending]) //eslint-disable-line

    const onProgress = ({ playedSeconds }) => {
        let timeWatched = parseInt(playedSeconds);

        if (movie && (timeWatched >= 0) && (timeWatched % 1 === 0)) {
            dispatch(updateTimeWatched({
                contentId: movie.id,
                timeWatched
            }));
        }
    };

    const onDuration = (duration) => {
        if (movie && duration && duration > 0) {
            dispatch(addToCurrentlyWatching({
                contentId: movie.id,
                contentType: movie.contentType,
                duration
            }));
        }
    };

    return (
        <Fragment>
            {userDetail && !userDetail.isAuthorized ? (
                <>
                    {!movie || !movie.id ? (
                        <LoadingScreen mode="full" />
                    ) : (
                        <LockedContentScreen thumbnail={movie.images.v} />
                    )}
                </>
            ) : (
                <WatchContentContainer>
                    <WatchAreaContainer>
                        <WatchArea>
                            {movie.id && movie.id !== "" ? (
                                <ReactPlayer
                                    controls
                                    playing={true}
                                    // url="https://www.youtube.com/watch?v=dvgZkm1xWPE#t=3m05s"}
                                    url={`${movie.playbackUrl}#t=${startTime}s`}
                                    width='100%'
                                    height='100%'
                                    onProgress={onProgress}
                                    onDuration={onDuration}
                                />
                            ) : (
                                <LoadingScreen />
                            )}
                        </WatchArea>
                    </WatchAreaContainer>
                    <ContentDetailWrapper>
                        {!movie || !movie.id ? (
                            <></>
                        ) : (
                            <ContentDetailContainer>
                                <h2>{movie.title}</h2>
                                <Meta>
                                    {movie.genre !== "" ? <MetaItem>{movie.genre}</MetaItem> : <></>}
                                    {movie.censorRating !== "" ? <MetaItem>{movie.censorRating}</MetaItem> : <></>}
                                    {movie.channelName !== "" ? <MetaItem>{movie.channelName}</MetaItem> : <></>}
                                </Meta>
                                <p>{movie.description}</p>
                            </ContentDetailContainer>
                        )}
                    </ContentDetailWrapper>
                    <RelatedContentContainer>
                        {movie && movie.id ? <MediaRelatedContent contentId={movie.id} contentType="movie" /> : <></>}
                    </RelatedContentContainer>
                </WatchContentContainer>
            )}
        </Fragment>
    )
}

export default WatchMovie
