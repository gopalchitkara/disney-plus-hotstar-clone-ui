import styled, { keyframes } from "styled-components/macro";

const MainContainer = styled.main`
    min-height: calc(100vh - 80px);
    padding: 0 calc(2.5vw + 10px);
    margin-top: 80px;
    position: relative;

    &:before {
        background: linear-gradient(to bottom, #141b29, #0c111b 300px);
        content: "";
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
`

const loadingBg = keyframes`
    0%{background:#111826}
    50%{background:#192133}
    100%{background:#111826}
`

const WatchContentContainer = styled(MainContainer)`
    padding: 0;
`

const WatchAreaContainer = styled.div``

const WatchArea = styled.div`
    height: 50vh;
    background: rgba(0,0,0,1);

    @media screen and (min-width: 576px) {
        height: 65vh;
    }

    @media screen and (min-width: 768px) {
        height: 75vh;
    }
`

const ContentDetailWrapper = styled.div`
    padding: 0 calc(2.5vw + 10px);
    margin-top: 30px;
`

const ContentDetailContainer = styled.div`
    padding-bottom: calc(1.5vw + 10px);
    border-bottom: solid 1px rgba(255,255,255,0.5);

    h2 {
        color: rgba(255,255,255,1);
        font-weight: 500;
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

const RelatedContentContainer = styled.div`
    padding: 0 calc(2.5vw + 10px);
`



export {
    MainContainer, loadingBg, WatchContentContainer, WatchAreaContainer, WatchArea,
    ContentDetailWrapper, ContentDetailContainer, Meta, MetaItem, RelatedContentContainer
}