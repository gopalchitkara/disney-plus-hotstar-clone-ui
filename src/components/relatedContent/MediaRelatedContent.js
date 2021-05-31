import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import ContentTray from '../trayAndCards/ContentTray'
import useFetch from '../../customHooks/useFetch'
import { TraysContainer } from '../common/sharedCardTrayStyles'

function MediaRelatedContent({ contentId, contentType }) {
    const [trailerAndExtras, setTrailerAndExtras] = useState({});
    const [bonusContent, setBonusContent] = useState({});
    const [similarContent, setSimilarContent] = useState({});

    const { data: trailerData } = useFetch(`/api/${contentType}s/${contentId}/trailers`);
    const { data: extraData } = useFetch(`/api/${contentType}s/${contentId}/extras`);
    const { data: bonusData } = useFetch(`/api/${contentType}s/${contentId}/bonus`);
    const { data: similarContentData } = useFetch(`/api/${contentType}s/${contentId}/similar-content`);

    useEffect(() => {
        console.log("trailerData, extraData")
        if (trailerData && trailerData.trailers && extraData && extraData.extras) {
            setTrailerAndExtras({
                title: "Trailers & Extras",
                items: [...trailerData.trailers, ...extraData.extras],
                orientation: "horizontal"
            });
        }
    }, [trailerData, extraData])

    useEffect(() => {
        console.log("bonusData")
        if (bonusData && bonusData.bonuses) {
            setBonusContent({
                title: "Bonus Content",
                items: bonusData.bonuses,
                orientation: "horizontal"
            });
        }
    }, [bonusData])

    useEffect(() => {
        console.log("similarContentData")
        if (similarContentData && similarContentData.similarContent && similarContentData.similarContent.length > 0) {
            setSimilarContent({
                title: "More Like This",
                items: similarContentData.similarContent,
                orientation: "vertical"
            });
        }
    }, [similarContentData])

    return (
        <RelatedContent>
            {trailerAndExtras && trailerAndExtras.items && trailerAndExtras.items.length > 0 &&
                <TraysContainer>
                    <ContentTray trayDetail={trailerAndExtras} />
                </TraysContainer>
            }
            {bonusContent.items && bonusContent.items.length > 0 &&
                <TraysContainer>
                    <ContentTray trayDetail={bonusContent} />
                </TraysContainer>
            }
            {similarContent.items && similarContent.items.length > 0 &&
                <TraysContainer>
                    <ContentTray trayDetail={similarContent} />
                </TraysContainer>
            }
        </RelatedContent>
    )
}

export default MediaRelatedContent

const RelatedContent = styled.div`
`