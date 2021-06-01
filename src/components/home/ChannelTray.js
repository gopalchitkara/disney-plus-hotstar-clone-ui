import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import useFetch from '../../customHooks/useFetch';
import { loadingBg } from '../common/sharedStyles';

function ChannelTray() {
    const { data: channelData, isPending, error } = useFetch('/api/channels')

    return (
        <Container>
            {isPending ? (
                <ChannelWrapper>
                    <CardWrapper><ChannelCard /></CardWrapper>
                    <CardWrapper><ChannelCard /></CardWrapper>
                    <CardWrapper><ChannelCard /></CardWrapper>
                    <CardWrapper><ChannelCard /></CardWrapper>
                    <CardWrapper><ChannelCard /></CardWrapper>
                </ChannelWrapper>
            ) : (
                <ChannelWrapper>
                    {channelData && channelData.channels && channelData.channels.length > 0 && error === null ? (
                        <Fragment>
                            {channelData.channels.map(channel => {
                                return (
                                    <CardWrapper key={channel.id}>
                                        <ChannelCard
                                            onLoad={() => { document.getElementById(channel.channelName + "-video").play(); }}
                                        >
                                            <Link to={"/channel/" + channel.channelName}>
                                                {/* <img src={channel.imagePath} alt={channel.channelName} /> */}
                                                <img src={channel.imagePath} alt="" />
                                                <video loop muted id={channel.channelName + "-video"}>
                                                    <source src={channel.videoPath} type="video/mp4" />
                                                </video>
                                            </Link>
                                        </ChannelCard>
                                    </CardWrapper>
                                )
                            })}
                        </Fragment>
                    ) : (<></>)}
                </ChannelWrapper>
            )}
        </Container >
    )
}

export default ChannelTray

const Container = styled.div`
    margin-top:15px;
`

const ChannelWrapper = styled.div`
    display: grid;
    grid-gap: 7px;
    grid-template-columns: repeat(5, minmax(0, 1fr));

    @media screen and (min-width: 768px) {
        grid-gap: 10px;
    }

    @media screen and (min-width: 992px) {
        grid-gap: 15px;
    }
`

const CardWrapper = styled.div`
    border-radius: 5px;
`

const ChannelCard = styled.div`
    display: block;
    padding-bottom: calc(.56471 * 100%);
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    transition: all 250ms ease-in-out;
    z-index: 1;
    position: relative;
    background:#192133;
    animation: ${loadingBg} 2.5s ease infinite;
    
    img {
        display: inline-block;
        width: 100%;
        height: 100%;
        transition: all 250ms ease-in-out;
        z-index: 3;
        position: absolute;
        top: 0;
        left: 0;
    }

    video {
        display: inline-block;
        width: 100%;
        height: 100%;
        z-index: 2;
        border-radius: 5px;
        transition: all 250ms ease-in-out;
        position: absolute;
        top: 0;
        left: 0;
    }

    &:hover {
        transform: scale(1.09);

        img {
            opacity: 0;
        }
    }
`