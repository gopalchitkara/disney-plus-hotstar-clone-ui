import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick'
import styled from 'styled-components/macro'
import CurrentlyWatchingCard from './CurrentlyWatchingCard'
import { loadInitialState } from '../../redux/currentlyWatchingSlice'
import { verticalTraySettings } from '../common/sharedConfigurations'
import { SliderContainer } from '../common/sliderArrows'
import { TraysContainer, TrayWrapper, TrayTitle } from '../common/sharedCardTrayStyles'

function CurrentlyWatchingTray() {
    const [title] = useState("Continue Watching");

    const currentlyWatchingItems = useSelector((state) => state.currentlyWatching.items);

    const dispatch = useDispatch();

    useEffect(() => {
        let storedItems = JSON.parse(window.localStorage.getItem('currentlyWatchingLocalState'));
        // console.log({ storedItems })

        if (storedItems && storedItems !== null) {
            dispatch(loadInitialState(storedItems))
        }
    }, []) //eslint-disable-line

    return (
        <Fragment>
            {!currentlyWatchingItems || currentlyWatchingItems.length <= 0 ? (
                <></>
            ) : (
                <TraysContainer>
                    <TrayWrapper>
                        <TrayTitle>{title}</TrayTitle>
                        <SliderContainer className="tray-slider">
                            <Slider {...verticalTraySettings}>
                                {currentlyWatchingItems.map(item => {
                                    return (
                                        <div key={Math.random() * 100}>
                                            <CurrentlyWatchingCard details={item} />
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

export default CurrentlyWatchingTray