import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Slider from "react-slick";
import Card from './Card';
import { horizontalTraySettings, verticalTraySettings } from '../common/sharedConfigurations'
import { SliderContainer } from '../common/sliderArrows'

function ContentTray({ showTitle = true, trayDetail }) {
    const [title, setTitle] = useState(null);
    const [items, setItems] = useState(null);
    const [orientation, setOrientation] = useState(null);
    const [traySettings, setTraySettings] = useState(null)

    useEffect(() => {
        trayDetail && trayDetail.title && trayDetail.title !== "" ? setTitle(trayDetail.title) : setTitle(null);
        trayDetail && trayDetail.items && trayDetail.items.length > 0 ? setItems(trayDetail.items) : setItems(null);
        trayDetail && trayDetail.orientation && trayDetail.orientation !== "" ? setOrientation(trayDetail.orientation) : setOrientation(null);

        trayDetail && trayDetail.orientation && trayDetail.orientation === "horizontal"
            ? setTraySettings(horizontalTraySettings)
            : setTraySettings(verticalTraySettings);
    }, [trayDetail])

    return (
        <TrayWrapper>
            {items && items.length > 0 && traySettings !== null && orientation !== null ? (
                <TrayCarousel>
                    {showTitle && title && title !== "" &&
                        <TrayHeader>
                            <TrayTitle>{title}</TrayTitle>
                        </TrayHeader>
                    }
                    <SliderContainer className="tray-slider">
                        <Slider {...traySettings}>
                            {items.map(item => {
                                return (
                                    <div key={Math.random() * 100}>
                                        <Card item={item} orientation={orientation} />
                                    </div>
                                )
                            })}
                        </Slider>
                    </SliderContainer>
                </TrayCarousel>
            ) : (<></>)}
        </TrayWrapper >
    )
}

export default ContentTray

const TrayWrapper = styled.div`
    margin-top: 20px;
`
const TrayCarousel = styled.div``
const TrayHeader = styled.div``
const TrayTitle = styled.h3`
    margin-bottom: 15px;
    color: rgba(255,255,255,1);
    font-weight: 400;
`
