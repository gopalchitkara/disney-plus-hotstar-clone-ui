import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthorized, setUnauthorized } from '../../redux/authSlice'
import { showLoginScreen, logoutUser } from '../../redux/authSlice';

function UserAuthInNav() {
    const history = useHistory();
    const userDetail = useSelector((state) => state.auth.userDetail);
    const dispatch = useDispatch()

    return (
        <UserProfile>
            {userDetail && userDetail.isAuthorized ? (
                <DropdownContainer>
                    {/* <ProfilePicture src="/media/images/user-profile-picture.jpg" alt="" /> */}
                    <ProfilePicture>
                        <i class="fas fa-user"></i>
                    </ProfilePicture>
                    <UserMenu>
                        <MenuItem
                            onClick={() => history.push("/watchlist")}
                        >Watchlist</MenuItem>
                        <MenuItem
                            onClick={() => history.push("/my-account")}
                        >My Account</MenuItem>
                        <MenuItem
                            onClick={() => { dispatch(logoutUser()) }}
                        >Logout</MenuItem>
                    </UserMenu>
                </DropdownContainer>
            ) : (
                <LoginButton
                    onClick={() => { dispatch(showLoginScreen()) }}
                >
                    Login
                </LoginButton>
            )
            }
        </UserProfile >
    )
}

export default UserAuthInNav

const LoginButton = styled.div`
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
    color: rgba(255,255,255,0.8);
    border: solid 1px rgba(255,255,255,0.8);
    padding: 5px 15px;
    border-radius: 5px;
    transition: all 100ms ease-in-out;

    &:hover {
        color: rgba(255,255,255,1);
        border: solid 1px rgba(255,255,255,1);
    }
`

const UserProfile = styled.div`
    display: inline-block;
    margin-left: auto;
`

const UserMenu = styled.ul`
    display: none;
    flex-direction: column;
    list-style-type: none;
    min-width: 140px;
    position: absolute;
    top: 0px;
    right: -15px;
    margin: 0px 0px 0px 0px;
    padding: 35px 15px 0px 0px;
    color: rgba(255, 255, 255, 0.8);
    /* background: #192133; */

    &:hover {
        display: flex;
    }
`

const DropdownContainer = styled.div`
    position: relative;
    height: 100%;

    /* &:hover ~ ${UserMenu} {
        display: flex;
    } */
`

const MenuItem = styled.li`
    padding: 12px 20px;
    cursor: pointer;
    font-size: 0.9rem;
    background: #192133;
    
    &:hover {
        background: #0c111b;
    }
`

// const ProfilePicture = styled.img`
const ProfilePicture = styled.span`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    cursor: pointer;
    
    &:hover ~ ${UserMenu} {
        display: flex;
    }

    i {
        font-size: 1.4rem;
        cursor: pointer;
        display: block;
    }
`