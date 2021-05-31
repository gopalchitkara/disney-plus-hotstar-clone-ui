import { NextArrow, NextArrowLarge, PrevArrow, PrevArrowLarge } from "./sliderArrows";

const horizontalTraySettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        }
    ]
}

const verticalTraySettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8, // 6 - horizontal
    slidesToScroll: 8, // 6 - horizontal
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 6,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        }
    ]
}

const featuredTraySettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 8000,
    fade: false,
    pauseOnHover: false,
    nextArrow: <NextArrowLarge />,
    prevArrow: <PrevArrowLarge />
};

export { verticalTraySettings, horizontalTraySettings, featuredTraySettings }