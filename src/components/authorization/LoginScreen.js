import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { hideLoginScreen, loginAsGuest, loadInitialAuth } from '../../redux/authSlice';

function LoginScreen() {
    const showScreen = useSelector((state) => state.auth.showLoginScreen);
    const userDetail = useSelector((state) => state.auth.userDetail);

    const dispatch = useDispatch();

    useEffect(() => {
        let localAuth = JSON.parse(window.localStorage.getItem('authState'));

        if (localAuth && localAuth !== null) {
            dispatch(loadInitialAuth(localAuth))
        }
    }, []) //eslint-disable-line

    return (
        <Fragment>
            {!userDetail.isAuthorized ? (
                <LoginWrapper style={{ display: showScreen ? "flex" : "none" }}>
                    <LoginContainer>
                        <Title>Continue to fake login</Title>
                        <SubTitle>as Guest</SubTitle>
                        <Actions>
                            <CancelButton
                                onClick={() => { dispatch(hideLoginScreen()) }}
                            >Cancel</CancelButton>
                            <ProceedButton
                                onClick={() => { dispatch(loginAsGuest()) }}
                            >Proceed</ProceedButton>
                        </Actions>
                    </LoginContainer>
                </LoginWrapper>
            ) : (<></>)}
        </Fragment>
    )
}

export default LoginScreen

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.4);
    z-index: 2001;
    opacity: 1;
    transition: all 250ms ease-in-out;
`

const LoginContainer = styled.div`
    background: #192133;
    padding: 50px 60px;
    border-radius: 5px;
    color: rgba(255,255,255,1);
`

const Title = styled.div`
    font-size: 1.4rem;
    text-align: center;
    font-weight: 500;
    margin-bottom: 15px;
`
const SubTitle = styled.div`
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 50px;
`
const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: space-between;
`
const ActionButton = styled.div`
    padding: 10px 20px;
    display: inline-block;
    width: 50%;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
`

const CancelButton = styled(ActionButton)`
    background: rgba(229,56,59);
    margin-right: 10px;
`

const ProceedButton = styled(ActionButton)`
    background: rgba(56,176,0);
    margin-left: 10px;
`