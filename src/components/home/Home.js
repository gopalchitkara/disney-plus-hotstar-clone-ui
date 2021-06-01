import React, { Suspense } from 'react'
import styled from 'styled-components/macro'
import FeaturedCarousel from './FeaturedCarousel'
import { MainContainer } from '../common/sharedStyles'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ChannelTray = React.lazy(() => import('./ChannelTray'))
const CurrentlyWatchingTray = React.lazy(() => import('../currentlyWatching/CurrentlyWatchingTray'))
const WatchlistTray = React.lazy(() => import('../watchlist/WatchlistTray'))
const ContentTrays = React.lazy(() => import('./ContentTrays'))

function Home() {
    return (
        <HomeContainer>
            <FeaturedCarousel />
            <Suspense fallback={<div></div>}>
                <ChannelTray />
            </Suspense>
            <Suspense fallback={<div></div>}>
                <CurrentlyWatchingTray />
                <WatchlistTray />
            </Suspense>
            <Suspense fallback={<div></div>}>
                <ContentTrays />
            </Suspense>
        </HomeContainer>
    )
}

export default Home

const HomeContainer = styled(MainContainer)`
`