import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom';
import { MainContainer } from '../common/sharedStyles'
import styled from 'styled-components/macro';
import useFetch from '../../customHooks/useFetch'

function SeasonEpisodes() {
    const [show, setShow] = useState({})
    const [seasonEpisodes, setSeasonEpisodes] = useState([])

    const { show_id, season_no } = useParams();
    const history = useHistory();

    const { data: seasonData, isPending, error } = useFetch(`/api/shows/${show_id}/seasons/${season_no}/episodes`) //eslint-disable-line

    useEffect(() => {
        if (!isPending) {
            const { episodes } = seasonData;

            setShow({
                orientation: episodes.orientation,
                seasonTitle: episodes.seasonTitle,
                id: episodes.showId,
                title: episodes.showTitle,
                titleClean: episodes.showTitleClean,
            });

            if (episodes.items.length > 0)
                setSeasonEpisodes(episodes.items);
            else
                history.push("/not-found")
        }
    }, [isPending]) //eslint-disable-line

    return (
        <MainContainer>
            <TitleSection>
                <Meta>
                    {show && show.title ? (<MetaItem><Link to={`/tv/${show.titleClean}/${show.id}`} >{`${show.title}`}</Link></MetaItem>) : (<></>)}
                    {show && show.seasonTitle ? (<MetaItem>{show.seasonTitle}</MetaItem>) : (<></>)}
                </Meta>
            </TitleSection>
            <CardsContainer>
                {seasonEpisodes && seasonEpisodes.length > 0 && seasonEpisodes.map(item => {
                    return (
                        <HorizontalCardWrapper key={item.id}>
                            <CardContent>
                                <Link to={`/tv/${show.titleClean}/${show.id}/watch/se/${item.seasonNumber}/ep/${item.episodeNumber}`}>
                                    <CardThumbnail>
                                        <ImageContainer style={{ backgroundImage: `url("${item.thumbnailUrl}")` }} />
                                    </CardThumbnail>
                                    <CardInitials>
                                        <i className="fas fa-play"></i>
                                        {`S${item.seasonNumber} E${item.episodeNumber}`}
                                    </CardInitials>
                                    <CardDetails className="card-details">
                                        <ContentTitle>{item.title}</ContentTitle>
                                        {/* {item.subInfo && item.subInfo !== "" && <SubInfo>{item.subInfo.join(", ")}</SubInfo>} */}
                                        <Description>{item.description.slice(0, 68).trim()}...</Description>
                                        <Actions>
                                            <AddToWatchlist
                                                onClick={(e) => { e.preventDefault(); }}
                                            >
                                                {!item.inWatchlist ? (
                                                    <Fragment>
                                                        <i className="fas fa-plus"></i>
                                                        <AddTitle>
                                                            Add to Watchlist
                                                        </AddTitle>
                                                    </Fragment>
                                                ) : (
                                                    <Fragment>
                                                        <i className="fas fa-check"></i>
                                                        <AddTitle>
                                                            Added to Watchlist
                                                        </AddTitle>
                                                    </Fragment>
                                                )}
                                            </AddToWatchlist>
                                        </Actions>
                                    </CardDetails>
                                </Link>
                            </CardContent>
                        </HorizontalCardWrapper>
                    )
                })}
            </CardsContainer>
        </MainContainer >
    )
}

export default SeasonEpisodes

const TitleSection = styled.section`
`

const Meta = styled.ul`
    font-weight: bold;
    font-size: 1.4rem;
    display: flex;
    flex-direction: row;
    margin: 15px 0px 20px -15px;
    padding-top: 30px;

    @media screen and (min-width: 576px) {
        /* display: flex; */
    }

    @media screen and (min-width: 768px) {
        /* font-size: 0.9rem; */
        /* margin: 10px 0px 0px -15px; */

    }

    @media screen and (min-width: 992px) {
        font-size: 1.4rem;
    }
`

const MetaItem = styled.li`
    margin: 0px 15px;
    font-weight: 500;
    color: rgba(255,255,255,1);
    
    &:first-child{
        list-style: none
    }

    a{
        text-decoration: none;
        color: #1f80e0; //blue
    }
`

const CardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* margin: 0px -15px; */
    
`

const HorizontalCardWrapper = styled.div`
    /* width: calc(calc(100vw - 85px) / 5.293); */
    width: calc(calc(100vw - 25px) / 2.293);

    @media screen and (min-width: 576px) {
        width: calc(calc(100vw - 45px) / 3.293);
    }

    @media screen and (min-width: 768px) {
        width: calc(calc(100vw - 65px) / 4.293);
    }

    @media screen and (min-width: 992px) {
        width: calc(calc(100vw - 85px) / 5.293);
    }

    @media screen and (min-width: 1200px) {
        width: calc(calc(100vw - 85px) / 6.293);
    }
    padding: 5px 5px;
`

const CardContent = styled.article`
    width: 100%;
    background:#192133;
    overflow: hidden;
    position: relative;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    border-radius: 5px;
    transition: transform .25s cubic-bezier(0.33, 0.04, 0.63, 0.93);
    /* transition: transform .25s ease-in-out; */
    display: block;

    &:hover {
        transform: scale(1.3);
        /* transform: scale3d(1.26, 1.26, 1) translate3d(0, 0, 0) perspective(500px); */
        z-index: 4 !important;

        .card-details {
            opacity: 1;
        }
    }
`

const CardThumbnail = styled.div`
    position: relative;
    min-height: auto !important;
`

const ImageContainer = styled.div`
    position: relative;
    display: block;
    padding-bottom: calc(.56471 * 100%);

    background-repeat: no-repeat;
    background-position: center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
`

const CardInitials = styled.div`
    display: block;
    opacity: 1;
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 38px 12px 10px 12px;
    background-image: linear-gradient(to bottom, rgba(4,8,15,0),  #192133);
    color: rgba(255,255,255,0.7);
    transition: opacity .25s cubic-bezier(0.33, 0.04, 0.63, 0.93);
    font-size: 0.95rem;
    font-weight: 500;
    color: rgba(255,255,255,1);

    i {
        font-size: 0.8rem;
        margin-right: 10px;
    }
`

const CardDetails = styled.div`
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

const ContentTitle = styled.div`
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba(255,255,255,1);
`

const SubInfo = styled.div`
    font-size: 0.6rem;
    margin-top: 2px;
`


const Description = styled.div`
    font-size: 0.6rem;
    font-weight: 200;
    color: rgba(255,255,255,0.8);
    margin-top: 2px;
`

const Actions = styled.div``

const AddToWatchlist = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 2px;
    align-items: center;
    margin-top: 5px;
    padding: 5px;
    i {
        font-size: 0.8rem;
    }

    &:hover {
        background: rgba(255,255,255,0.1);
    }
`

const AddTitle = styled.span`
    font-size: 0.6rem;
    margin-left: 10px;
`