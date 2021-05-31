import React, { useState } from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import UserAuthInNav from '../header/UserAuthInNav'

function LockedContentScreen() {
    const [thumbnailUrl, setThumbnailUrl] = useState("/media/images/content/the-mandalorian-s2-v.webp")
    return (
        <Fragment>
            <LockedBanner>
                <img src="/media/images/psp-background.webp" alt="" />
            </LockedBanner>
            <LockedContentWrapper>
                <TopBar>
                    <NavLogo>
                        <Link to="/">
                            <img src="/media/logo/disney-hotstar-logo-dark.svg" alt="" style={{ marginTop: -5 }} />
                        </Link>
                    </NavLogo>
                    <UserAuthInNav />
                </TopBar>
                <ImageWrapper>
                    <CardThumbnail>
                        <ImageContainer style={{ backgroundImage: `url("${thumbnailUrl}")` }} />
                    </CardThumbnail>
                </ImageWrapper>
                <ContentInfoWrapper>
                    <Title>Login to watch</Title>
                    {/* <ContentInfo>
                        <ContentTable style={{ width: "100%" }}>
                            <TableRow>
                                <TableHeading></TableHeading>
                                <TableHeading>Unregistered</TableHeading>
                                <TableHeading>Logged in</TableHeading>
                            </TableRow>
                            <TableRow>
                                <TableData >Title 1</TableData>
                                <TableData>X</TableData>
                                <TableData>Y</TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Title 2</TableData>
                                <TableData>X</TableData>
                                <TableData>Y</TableData>
                            </TableRow>
                        </ContentTable>
                    </ContentInfo> */}
                </ContentInfoWrapper>
            </LockedContentWrapper>
        </Fragment>
    )
}

export default LockedContentScreen

const LockedBanner = styled.div`
    /* width: 100%; */
    /* height: 350px; */

    img {
        width: 100%;
        z-index: 1001;
        position: fixed;
        top: 0;
        left: 0;
        background: #192133;
    }

`

const LockedContentWrapper = styled.div`
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    /* background-image: linear-gradient(to bottom, #192133, #030B17); */
    background-image: linear-gradient(to bottom,  rgba(0,0,0,0.6), #030B17, #030B17);
    z-index: 1002;
    opacity: 1;
    transition: all 250ms ease-in-out;
`

const TopBar = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 calc(2.5vw + 5px);
    width: 100%;
    background-image: linear-gradient(to top, rgba(0,0,0,0),  #030B17);
    z-index: 1005;

`
const NavLogo = styled.div`
    display: inline-block;
`

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: -40px;
`

const CardThumbnail = styled.div`
    position: relative;
    min-height: auto !important;
    width: 120px;
    overflow: hidden;
    border-radius: 5px;
    border: solid 1px rgba(255,255,255,1);
`

const ImageContainer = styled.div`
    position: relative;
    display: block;
    padding-bottom: calc(1.32821 * 100%);
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
`

const ContentInfoWrapper = styled.div`
    display: block;
    width: 60vw;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
`

const ContentInfo = styled.div`
    background: #192133;
    margin-top: 10px;
    padding: 30px 50px;
    border-radius: 10px;
`

const Title = styled.div`
    text-align: center;
    font-size: 1.4rem;
    color: rgba(255,255,255);
    font-weight: 500;
`

const ContentTable = styled.table``
const TableRow = styled.tr``
const TableHeading = styled.th`
    text-align: center;
`
const TableData = styled.td`
    text-align: center;
`

