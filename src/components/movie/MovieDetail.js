import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToWatchlist, removeFromWatchlist } from '../../redux/watchlistSlice'
import useFetch from '../../customHooks/useFetch'
import {
    SliderItem, SliderContentLink, SliderImg, ImageGradient, SliderCaption,
    Title, Meta, MetaItem, Description, MovieDetailContainer, MovieInfo, MovieActions, PrimaryActions,
    WatchMovieAction, SecondaryActions, AddToWatchlistAction, ShareAction
} from '../common/sharedSliderStyles';
import MediaRelatedContent from '../relatedContent/MediaRelatedContent'

function MovieDetail() {
    const [movie, setMovie] = useState({});
    const [inWatchlist, setInWatchlist] = useState(false)
    const [isWatching, setIsWatching] = useState(false) //eslint-disable-line

    const watchlistItems = useSelector((state) => state.watchlist.items);

    const { movie_id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const { data: movieData, isPending, error } = useFetch('/api/movies/' + movie_id) //eslint-disable-line

    useEffect(() => {
        if (!isPending) {
            if (!movieData || !movieData.movie) history.push("/not-found");
            setMovie(movieData.movie);
        }
    }, [movieData, isPending]) //eslint-disable-line

    useEffect(() => {
        if (movie && movie.id && watchlistItems) {
            let isInWatchlist = watchlistItems.find(x => x.id === parseInt(movie.id));
            if (isInWatchlist) {
                setInWatchlist(true);
            } else {
                setInWatchlist(false);
            }
        }
    }, [movie, watchlistItems])

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
        <MovieDetailContainer>
            <SliderItem>
                {movie && movie.id && movie.id !== "" && error === null ? (
                    <SliderContentLink to={`/movie/${movie.titleClean}/${movie.id}/watch`}>
                        <SliderCaption>
                            <MovieInfo>
                                <Title>{movie.title}</Title>
                                <Meta>
                                    {movie.runtimeHours && movie.runtimeMinutes &&
                                        <MetaItem>{`${movie.runtimeHours} hr ${movie.runtimeMinutes} min`}</MetaItem>}
                                    {movie.yearOfRelease !== "" && <MetaItem>{movie.yearOfRelease}</MetaItem>}
                                    {movie.genre !== "" && <MetaItem>{movie.genre}</MetaItem>}
                                    {movie.censorRating !== "" && <MetaItem>{movie.censorRating}</MetaItem>}
                                    {movie.channelName !== "" && <MetaItem>{movie.channelName}</MetaItem>}
                                </Meta>
                                <Description>{movie.description}</Description>
                            </MovieInfo>
                            <MovieActions>
                                <PrimaryActions>
                                    <WatchMovieAction>
                                        <i className="fas fa-play"></i>
                                        {isWatching ? <h2>Continue Movie</h2> : <h2>Watch Movie</h2>}
                                    </WatchMovieAction>
                                </PrimaryActions>
                                <SecondaryActions>
                                    <AddToWatchlistAction
                                        onClick={(e) => { handleWatchlistBtnClick({ e, data: movie }) }}
                                    >
                                        {inWatchlist ? (
                                            <i className="fas fa-check"></i>
                                        ) : (
                                            <i className="fas fa-plus"></i>
                                        )}
                                        <h5>Watchlist</h5>
                                    </AddToWatchlistAction>
                                    <ShareAction>
                                        <i className="fas fa-share-alt"></i>
                                        <h5>Share</h5>
                                    </ShareAction>
                                </SecondaryActions>
                            </MovieActions>
                        </SliderCaption>
                        <SliderImg>
                            <img src={movie.images.b} alt={movie.titleClean} />
                            <ImageGradient />
                        </SliderImg>
                    </SliderContentLink>
                ) : (<></>)}
            </SliderItem>
            {movie && movie.id ? <MediaRelatedContent contentId={movie.id} contentType="movie" /> : <></>}
        </MovieDetailContainer>
    )
}

export default MovieDetail