import React, { Fragment } from 'react'
import styled from 'styled-components'
import { MainContainer } from './common/sharedStyles'

function LoadingScreen({ mode = "inline" }) {
    return (
        <Fragment>
            {mode === "full" ? (
                <MainContainer>
                    <FullScreen>
                        <i className="fas fa-spinner fa-3x fa-spin"></i>
                    </FullScreen>
                </MainContainer>
            ) : (
                <InlineScreen>
                    <i className="fas fa-spinner fa-3x fa-spin"></i>
                </InlineScreen>
            )}
        </Fragment>
    )
}

export default LoadingScreen

const FullScreen = styled.div`
    display: flex;
    flex-direction: row;
    height: 70vh;
    align-items: center;
    justify-content: center;
`

const InlineScreen = styled.div`
    display: flex;
    flex-direction: row;
    height: inherit;
    width: 100%;
    justify-content:center;
    align-items: center;
`