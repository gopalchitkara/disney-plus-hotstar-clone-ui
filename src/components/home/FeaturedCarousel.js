import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetch from '../../customHooks/useFetch'
import { SliderContainer } from '../common/sliderArrows'
import { featuredTraySettings } from '../common/sharedConfigurations'
import {
    SliderItem, SliderContentLink, SliderImg, ImageGradient, SliderCaptionFeaturedContent,
    Title, Meta, MetaItem, Description
} from '../common/sharedSliderStyles';

function FeaturedCarousel() {
    const { data, isPending } = useFetch('/api/featured-content')

    return (
        <SliderContainer className="carousel-slider">
            {isPending ? (
                <SliderItem />
            ) : (
                <Slider {...featuredTraySettings}>
                    {data && data.featuredContent.length > 0 && data.featuredContent.map(content => {
                        return (
                            <div key={content.id}>
                                <SliderItem>
                                    <SliderContentLink to={`/${content.contentType === "show" ? "tv" : content.contentType}/${content.titleClean}/${content.id}`}>
                                        <SliderCaptionFeaturedContent>
                                            <Title>{content.title}</Title>
                                            <Meta>
                                                {content.genre && content.genre !== "" ? <MetaItem>{content.genre}</MetaItem> : <></>}
                                                {content.yearOfRelease && content.yearOfRelease !== "" ? <MetaItem>{content.yearOfRelease}</MetaItem> : <></>}
                                                {content.channelName && content.channelName !== "" ? <MetaItem>{content.channelName}</MetaItem> : <></>}
                                            </Meta>
                                            {content.description && content.description !== "" ? <Description>{content.description}</Description> : <></>}
                                        </SliderCaptionFeaturedContent>
                                        <SliderImg>
                                            <img src={content.bannerImagePath} alt={content.titleClean} />
                                            <ImageGradient />
                                        </SliderImg>
                                    </SliderContentLink>
                                </SliderItem>
                            </div>
                        )
                    })}
                </Slider >
            )}
        </SliderContainer>
    )
}

export default FeaturedCarousel

