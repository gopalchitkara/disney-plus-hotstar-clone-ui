import styled from "styled-components/macro";
import { loadingBg } from './sharedStyles';

const TraysContainer = styled.div`
    margin-top: 30px;    
`
const TrayWrapper = styled.div`
    margin-top: 20px;   
`
const TrayTitle = styled.h3`
    margin-bottom: 15px;
    color: rgba(255,255,255,1);
    font-weight: 400;
`

const VerticalCardWrapper = styled.div`
    width: calc(calc(100vw - 25px) / 3.5);

    @media screen and (min-width: 576px) {
        width: calc(calc(100vw - 35px) / 4.5);
    }

    @media screen and (min-width: 768px) {
        width: calc(calc(100vw - 55px) / 5.5);
    }

    @media screen and (min-width: 992px) {
        width: calc(calc(100vw - 55px) / 6.5);
    }

    @media screen and (min-width: 1200px) {
        width: calc(calc(100vw - 105px) / 8.5);
    }
`

const HorizontalCardWrapper = styled.div`
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
`

const ImageContainer = styled.div`
    position: relative;
    display: block;
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
`

const VerticalImageContainer = styled(ImageContainer)`
    padding-bottom: calc(1.32821 * 100%);
`

const HorizontalImageContainer = styled(ImageContainer)`
    padding-bottom: calc(.56471 * 100%);
`

const CardThumbnail = styled.div`
    position: relative; 
    min-height: auto !important;
`

const CardContent = styled.article`
    width: 100%;
    background:#192133;
    animation: ${loadingBg} 2.5s ease infinite;
    overflow: hidden;
    position: relative;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    border-radius: 5px;
    transition: transform .25s cubic-bezier(0.33, 0.04, 0.63, 0.93);
    display: block;
    cursor: pointer;

    &:hover {
        transform: scale(1.35);
        z-index: 4 !important;

        .card-details {
            opacity: 1;
        }
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

const CardTitle = styled.div`
    font-size: 0.7rem;
    font-weight: 500;
    color: rgba(255,255,255,1);
`

const CardDescription = styled.div`
    font-size: 0.6rem;
    font-weight: 200;
    color: rgba(255,255,255,0.8);
    margin-top: 2px;
`

const AddToWatchlist = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 2px;
    align-items: center;
    margin-top: 2px;
    padding: 4px;

    i {
        font-size: 0.5rem;
    }

    &:hover {
        background: rgba(255,255,255,0.1);
    }
`

const AddToWatchlistTitle = styled.span`
    font-size: 0.6rem;
    margin-left: 10px;
`

export {
    VerticalCardWrapper, VerticalImageContainer, HorizontalCardWrapper,
    HorizontalImageContainer, CardContent, CardDetails, CardTitle, CardDescription, AddToWatchlist,
    AddToWatchlistTitle, CardThumbnail, TraysContainer, TrayWrapper, TrayTitle

}