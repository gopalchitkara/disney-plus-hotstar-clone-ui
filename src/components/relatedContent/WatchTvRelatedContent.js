import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components/macro'
import { MainContainer } from '../common/sharedStyles'
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import ContentTray from '../trayAndCards/ContentTray';

function WatchTvRelatedContent() {
    const [show, setShow] = useState({})
    const [watchShow, setWatchShow] = useState({})
    const [playbackUrl, setPlaybackUrl] = useState("")
    const { show_id, content_type, content_id } = useParams();
    const history = useHistory();

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
    // }, [content_type, content_id]) //eslint-disable-line

    // useEffect(() => {
    //     let _show = shows.find(el => el.id === parseInt(show_id));
    //     setShow(_show);

    //     let _watchShow = {
    //         id: 1,
    //         title: "Watch Now",
    //         items: [{
    //             id: _show.id,
    //             content_type: _show.content_type,
    //             title: _show.title,
    //             title_clean: _show.title_clean,
    //             thumbnail_url: _show.images.b,
    //             target_url: `/tv/${_show.title_clean}/${_show.id}`
    //         }],
    //         orientation: "horizontal"
    //     }
    //     setWatchShow(_watchShow);
    // }, [show_id])

    return (
        <WatchMovieContainer>
            {/* <WatchAreaContainer>
                <WatchArea>
                    {playbackUrl && playbackUrl !== "" ? (
                        <ReactPlayer
                            controls
                            playing={true}
                            url={playbackUrl}
                            width='100%'
                            height='100%'
                        />
                    ) : (<>loading...</>)}
                </WatchArea>
            </WatchAreaContainer>
            <MovieDetailWrapper>
                <MovieDetailContainer>
                    <h2><Link to={`/tv/${show.title_clean}/${show.id}`}>{show.title}</Link></h2>
                    <Meta>
                        {show.genre !== "" ? <MetaItem>{show.genre}</MetaItem> : <></>}
                        {show.censor_rating !== "" ? <MetaItem>{show.censor_rating}</MetaItem> : <></>}
                        {show.channel_name !== "" ? <MetaItem>{show.channel_name}</MetaItem> : <></>}
                    </Meta>
                    <p>{show.description}</p>
                    {watchShow.items && watchShow.items.length > 0 &&
                        <WatchNowContainer>
                            <HorizontalTray detail={watchShow} />
                        </WatchNowContainer>
                    }
                </MovieDetailContainer>
            </MovieDetailWrapper> */}
        </WatchMovieContainer>
    )
}

export default WatchTvRelatedContent


const WatchNowContainer = styled.div`
    padding-top: 15px;
`

const WatchMovieContainer = styled(MainContainer)`
    padding: 0;
`

const WatchAreaContainer = styled.div``

const WatchArea = styled.div`
    height: 75vh;
    background: rgba(0,0,0,1);
`

const MovieDetailWrapper = styled.div`
    padding: 0 calc(2.5vw + 10px);
    margin-top: 30px;
`

const MovieDetailContainer = styled.div`
    padding-bottom: calc(1.5vw + 10px);
    border-bottom: solid 1px rgba(255,255,255,0.5);

    h2>a {
        text-decoration: none;
        color: #1f80e0; //blue
    }

    p {
        margin-top: 7px;
    }
`

const Meta = styled.ul`
    font-weight: bold;
    font-size: 0.9rem;
    flex-direction: row;
    margin: 7px 0px 0px -15px;
    display: flex;

    @media screen and (min-width: 992px) {
        font-size: 1rem;
    }
`

const MetaItem = styled.li`
    margin: 0px 15px;
    font-weight: 400;
    
    &:first-child{
        list-style: none
    }
`
