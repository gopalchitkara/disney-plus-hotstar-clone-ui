import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components/macro'
import useFetch from '../../customHooks/useFetch';
import { MainContainer } from '../common/sharedStyles'
import ContentTray from '../trayAndCards/ContentTray'

function ChannelPage() {
    const [channelUrl, setChannelUrl] = useState(null);

    const { channel_name } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (channel_name && channel_name !== "") {
            if (["disney", "marvel", "pixar", "star-wars", "nat-geo"].includes(channel_name.toLowerCase())) {
                setChannelUrl(`/api/channel/${channel_name.toLowerCase()}/trays`);
                document.getElementById('banner-video').play();
            } else {
                history.push("/not-found")
            }
        }
    }, [channel_name]) //eslint-disable-line

    const { data, isPending, error } = useFetch(channelUrl);

    return (
        <ChannelContainer>
            <HeroMediaContainer>
                <HeroMedia>
                    <video loop muted id="banner-video">
                        <source src={`/media/videos/channels/${channel_name}-banner.mp4`} type="video/mp4" />
                    </video>
                </HeroMedia>
            </HeroMediaContainer>
            <TraysContainer>
                {isPending ? (
                    <></>
                ) : (
                    <TrayArea>
                        {data && data.content && data.content.length > 0 && error === null ? (
                            data.content.map(tray => {
                                return (
                                    <ContentTray key={Math.random() * 100} trayDetail={tray} />
                                )
                            })
                        ) : (
                            <h3>oops! something went wrong...</h3>
                        )}
                    </TrayArea>
                )}
            </TraysContainer>
        </ChannelContainer>
    )
}

export default ChannelPage

const ChannelContainer = styled(MainContainer)`
    padding: 0px;
`

const HeroMediaContainer = styled.div``

const HeroMedia = styled.div`
    video {
        width: 100%;
    }
`

const TraysContainer = styled.div`
    margin-top: 30px;    
    padding: 0 calc(2.5vw + 10px);
`

const TrayArea = styled.div`
`
