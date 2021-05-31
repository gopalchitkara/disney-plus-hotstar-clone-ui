import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { loadingBg, MainContainer } from './sharedStyles'

const SliderItem = styled.div`
    height: 50vw;
    overflow: hidden;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
    margin: 0px;
    z-index: 1;
    background: #030B17;
    animation: ${loadingBg} 2s ease infinite;

    @media screen and (min-width: 576px) {
        height: 45vw;
    }

    @media screen and (min-width: 768px) {
        height: 40vw;
    }

    @media screen and (min-width: 992px) {
        height: 37vw;
    }

    @media screen and (min-width: 1200px) {
        height: 30vw;
    }
`

const SliderContentLink = styled(Link)`
    display: block;
    background: #030B17;
    z-index: 2;
    height: inherit;
    color: rgba(255,255,255,0.8);
`

const SliderImg = styled.div`
    img {
        width: 100%;
        height: 100%;
        align-self: center;
        vertical-align: middle;
        z-index: 3;
    }

    @media screen and (min-width: 992px) {
        display: flex;
        flex-direction: row;
        position: relative;
        max-width: 790px;
        width: 790px;
        float: right;
    }  
`

const ImageGradient = styled.div`
    display: none;
    width: 200px;
    height: 100%;
    position: absolute;
    background: linear-gradient(to right, #030B17, rgba(0,0,0,0));
    top: 0;
    left: 0;
    z-index: 4;

    @media screen and (min-width: 992px) {
        display: block;
        margin-left: -1px;
    }  
`

const SliderCaptionFeaturedContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding: 0px 10px;
    width: 40%;
    height: 100%;
    z-index: 5;
    display: none;
    flex-direction: column;
    justify-content: center;

    /* background: rgba(0, 0, 0, 0.4); */

    @media screen and (min-width: 576px) {
        padding: 0px 20px;
    }

    @media screen and (min-width: 768px) {
        display: flex;
        padding: 0px 30px;
        background: linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0));
    }

    @media screen and (min-width: 992px) {
        width: 36%;
        background: rgba(0, 0, 0, 0);
        padding: 0px 0px 0px 50px;
    }
`


const SliderCaption = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 20px;
    width: 100%;
    height: 100%;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;

    /* background: rgba(0, 0, 0, 0.4); */

    @media screen and (min-width: 576px) {
        padding: 20px 40px;
    }

    @media screen and (min-width: 768px) {
        padding: 30px;
        width: 60%;
        background: linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0));
    }

    @media screen and (min-width: 992px) {
        width: 50%;
        background: rgba(0, 0, 0, 0);
        padding: 40px 0px 40px 50px;
    }
`


const Title = styled.h1`
    color: rgba(255, 255, 255, 1);
    font-size: 1.2rem;

    @media screen and (min-width: 576px) {
        font-size: 1.4rem;
    }

    @media screen and (min-width: 768px) {
        font-size: 1.6rem;
    }

    @media screen and (min-width: 992px) {
        font-size: 2rem;
    }
`

const Meta = styled.ul`
    font-weight: bold;
    font-size: 0.8rem;
    display: none;
    flex-direction: row;
    margin: 5px 0px 0px -15px;

    @media screen and (min-width: 576px) {
        display: flex;
    }

    @media screen and (min-width: 768px) {
        font-size: 0.9rem;
        margin: 10px 0px 0px -15px;

    }

    @media screen and (min-width: 992px) {
        font-size: 1rem;
    }
`

const MetaItem = styled.li`
    margin: 0px 15px;
    font-weight: 500;

    &:first-child{
        list-style: none
    }
`

const Description = styled.p`
    margin-top: 10px;
    line-height: 1.1;

    @media screen and (min-width: 576px) {
        line-height: 1.4;
    }

    @media screen and (min-width: 768px) {
        line-height: 1.6;
    }

    @media screen and (min-width: 992px) {
        line-height: 1.8;
    }
`


const MovieDetailContainer = styled(MainContainer)`
    padding: 0 calc(2.5vw + 10px);
`

const MovieInfo = styled.div`
    display: none;
    
    @media screen and (min-width: 768px) {
        display: block;
    }
`

const MovieActions = styled.div`
    margin-top: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: rgba(255,255,255,1);
    user-select: none;
`

const PrimaryActions = styled.div``

const WatchMovieAction = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    h2 {
        margin-left: 15px;
        font-size: 1.2rem;
        font-weight: 400;
    }

    i {
        font-size: 1.2rem;
    }
`

const SecondaryActions = styled.div`
    display: flex;
    flex-direction: row;

    div {
        margin-left: 30px;
    }

    h5 {
        font-weight: 400;
        margin-top: 5px;
    }
`

const AddToWatchlistAction = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    

    i {
        font-size: 1.4rem;
    }

    i.fa-check {
        color: #1f80e0;
    }
`

const ShareAction = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    i {
        font-size: 1.4rem;
    }
`


export {
    SliderItem, SliderContentLink, SliderImg, ImageGradient, SliderCaptionFeaturedContent, SliderCaption,
    Title, Meta, MetaItem, Description, MovieDetailContainer, MovieInfo, MovieActions, PrimaryActions,
    WatchMovieAction, SecondaryActions, AddToWatchlistAction, ShareAction
}