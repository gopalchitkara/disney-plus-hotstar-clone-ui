import React from 'react'
import { useDispatch } from 'react-redux';
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import UserAuthInNav from '../header/UserAuthInNav'
import { loginAsGuest } from '../../redux/authSlice';

function LockedContentScreen({ thumbnail }) {
    const dispatch = useDispatch();

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
                        <ImageContainer style={{ backgroundImage: `url("${thumbnail}")` }} />
                    </CardThumbnail>
                </ImageWrapper>
                <ContentInfoWrapper>
                    <Title>Login to watch</Title>
                    <ContentInfo>
                        <ContentTable style={{ width: "100%" }}>
                            <thead>
                                <TableRow>
                                    <TableHeading></TableHeading>
                                    <TableHeading>Free</TableHeading>
                                    <TableHeading>Registered</TableHeading>
                                </TableRow>
                            </thead>
                            <tbody >
                                <TableRow>
                                    <TableDataLeft>Disney+ movies, Hollywood movies & Kids content</TableDataLeft>
                                    <TableData>
                                        <i className="fas fa-times"></i>
                                    </TableData>
                                    <TableData>
                                        <i className="fas fa-check"></i>
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableDataLeft>Only Dubbed</TableDataLeft>
                                    <TableData>
                                        <i className="fas fa-times"></i>
                                    </TableData>
                                    <TableData>
                                        <i className="fas fa-check"></i>
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableDataLeft>English + Dubbed</TableDataLeft>
                                    <TableData>
                                        <i className="fas fa-times"></i>
                                    </TableData>
                                    <TableData>
                                        <i className="fas fa-check"></i>
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableDataLeft>Multiplex & new Indian movies</TableDataLeft>
                                    <TableData>
                                        <i className="fas fa-times"></i>
                                    </TableData>
                                    <TableData>
                                        <i className="fas fa-check"></i>
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableDataLeft>English shows & Disney+ Originals</TableDataLeft>
                                    <TableData>
                                        <i className="fas fa-times"></i>
                                    </TableData>
                                    <TableData>
                                        <i className="fas fa-check"></i>
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableDataLeft>Ad free entertainment</TableDataLeft>
                                    <TableData>
                                        <i className="fas fa-times"></i>
                                    </TableData>
                                    <TableData>
                                        <i className="fas fa-check"></i>
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableDataLeft>Screens you can watch on</TableDataLeft>
                                    <TableData>
                                        1
                                    </TableData>
                                    <TableData>
                                        2
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableDataLeft>Video quality</TableDataLeft>
                                    <TableData>
                                        SD
                                    </TableData>
                                    <TableData>
                                        HD
                                    </TableData>
                                </TableRow>
                            </tbody>
                        </ContentTable>
                        <LoginButton
                            onClick={() => { dispatch(loginAsGuest()) }}
                        >Continue to fake login</LoginButton>
                    </ContentInfo>
                </ContentInfoWrapper>
            </LockedContentWrapper>
        </Fragment>
    )
}

export default LockedContentScreen

const LoginButton = styled.div`
    margin-top: 10px;
    width: 100%;
    background: #1f80e0;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    color: rgba(255,255,255,1);
`

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

const ContentTable = styled.table`
    border: none !important;
`
const TableRow = styled.tr`
    border-bottom: solid 1px black;
`
const TableHeading = styled.th`
    text-align: center;
    font-weight: 500;
    font-size: 0.9rem;
    padding-bottom: 10px;

`
const TableData = styled.td`
    text-align: center;
    font-size: 0.8rem;
    padding: 3px 0px;
    border-bottom: solid 1px rgba(255,255,255,0.1);
`

const TableDataLeft = styled(TableData)`
    text-align: left;
`



