import styled from 'styled-components/macro'

const ArrowContainer = styled.div`
    height: 100%;
    width: 70px;

    @media screen and (min-width: 768px) {
        display: block !important;
    }
`

const LeftArrowContainer = styled(ArrowContainer)`
    margin-left: -20px;
`

const RightArrowContainer = styled(ArrowContainer)`
    margin-right: -20px;
`

const Arrow = styled.div`
    border-radius: 1px;
    border-bottom: solid 5px rgba(255,255,255,0.9);
    height: 18px;
    width: 18px;
    margin-left: auto;
    margin-top: auto;
    opacity: 0; //changed via slider-direction-arrow
    transition: opacity .15s cubic-bezier(0.33, 0.04, 0.63, 0.93);
    position: absolute;
    top: 47%; 
`

const LeftArrow = styled(Arrow)`
    border-left: solid 5px rgba(255,255,255,0.9);
    transform: rotateZ(45deg) !important;
    left: 30%;
`

const RightArrow = styled(Arrow)`
    border-right: solid 5px rgba(255,255,255,0.9);
    transform: rotateZ(-45deg) !important;
    right: 30%;
`


const LeftArrowLarge = styled(LeftArrow)`
    height: 22px;
    width: 22px;
    border-left: solid 5px rgba(255,255,255,0.9);
    transform: rotateZ(45deg) !important;
    left: 30%;
`

const RightArrowLarge = styled(RightArrow)`
    height: 22px;
    width: 22px;
    border-right: solid 5px rgba(255,255,255,0.9);
    transform: rotateZ(-45deg) !important;
    right: 30%;
`

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <RightArrowContainer
            className={className}
            style={{ ...style, display: "none", zIndex: 10 }}
            onClick={onClick}
        >
            <RightArrow className="slider-direction-arrow" />
        </RightArrowContainer>
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <LeftArrowContainer
            className={className}
            style={{ ...style, display: "none", zIndex: 3 }}
            onClick={onClick}
        >
            <LeftArrow className="slider-direction-arrow" />
        </LeftArrowContainer>
    );
}

function NextArrowLarge(props) {
    const { className, style, onClick } = props;
    return (
        <RightArrowContainer
            className={className}
            style={{ ...style, display: "none", zIndex: 10 }}
            onClick={onClick}
        >
            <RightArrowLarge className="slider-direction-arrow" />
        </RightArrowContainer>
    );
}

function PrevArrowLarge(props) {
    const { className, style, onClick } = props;
    return (
        <LeftArrowContainer
            className={className}
            style={{ ...style, display: "none", zIndex: 3 }}
            onClick={onClick}
        >
            <LeftArrowLarge className="slider-direction-arrow" />
        </LeftArrowContainer>
    );
}
const SliderContainer = styled.div`

    &:hover {
        .slider-direction-arrow {
            opacity: 1 !important;
        }
    }
`

export { NextArrow, PrevArrow, NextArrowLarge, PrevArrowLarge, SliderContainer }