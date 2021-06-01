import React, { Fragment, useState, useEffect } from 'react'
import Slider from 'react-slick'
import { useSelector, useDispatch } from 'react-redux'
import { loadInitialWatchlistState } from '../../redux/watchlistSlice'
import WatchlistCard from './WatchlistCard'
import { verticalTraySettings } from '../common/sharedConfigurations'
import { SliderContainer } from '../common/sliderArrows'
import { TraysContainer, TrayWrapper, TrayTitle } from '../common/sharedCardTrayStyles'

function WatchlistTray() {
    const [title] = useState("Watchlist");

    const watchlistItems = useSelector((state) => state.watchlist.items);
    const dispatch = useDispatch();

    useEffect(() => {
        let storedItems = JSON.parse(window.localStorage.getItem('watchlistLocalState'));

        if (storedItems && storedItems !== null && storedItems.length > 0) {
            dispatch(loadInitialWatchlistState(storedItems))
        }
    }, []) //eslint-disable-line

    return (
        <Fragment>
            {!watchlistItems || watchlistItems.length <= 0 ? (
                <></>
            ) : (
                <TraysContainer>
                    <TrayWrapper>
                        <TrayTitle>{title}</TrayTitle>
                        <SliderContainer className="tray-slider">
                            <Slider {...verticalTraySettings}>
                                {watchlistItems.map((item) => {
                                    return (
                                        <div key={Math.random() * 100}>
                                            <WatchlistCard details={item} />
                                        </div>
                                    )
                                })}
                            </Slider>
                        </SliderContainer>
                    </TrayWrapper>
                </TraysContainer>
            )}
        </Fragment>
    )
}

export default WatchlistTray