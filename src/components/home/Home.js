import React from 'react'
import styled from 'styled-components/macro'
import FeaturedCarousel from './FeaturedCarousel'
import ChannelTray from './ChannelTray'
import ContentTrays from './ContentTrays'
import { MainContainer } from '../common/sharedStyles'
import CurrentlyWatchingTray from '../currentlyWatching/CurrentlyWatchingTray'
import WatchlistTray from '../watchlist/WatchlistTray'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
    return (
        <HomeContainer>
            <FeaturedCarousel />
            <ChannelTray />
            <CurrentlyWatchingTray />
            <WatchlistTray />
            <ContentTrays />
        </HomeContainer>
    )
}

export default Home

const HomeContainer = styled(MainContainer)`
`