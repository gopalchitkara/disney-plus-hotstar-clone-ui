import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import UserAuthInNav from './UserAuthInNav'

function Navbar() {
    return (
        <Nav>
            <NavLogo>
                <Link to="/">
                    <img src="/media/logo/disney-hotstar-logo-dark.svg" alt="" style={{ marginTop: -5 }} />
                </Link>
            </NavLogo>
            <Navigations>
                {/* <Navul>
                    <Navli>
                        <NavLink to="/tv">TV</NavLink>
                    </Navli>
                    <Navli>
                        <NavLink to="/movie">Movies</NavLink>
                    </Navli>
                    <Navli>
                        <NavLink to="/premium">Premium</NavLink>
                    </Navli>
                    <Navli>
                        <NavLink to="/channel/disney">Disney+</NavLink>
                    </Navli>
                </Navul> */}
            </Navigations>
            <SearchContainer></SearchContainer>
            <UserAuthInNav />
        </Nav>
    )
}

export default Navbar

const Nav = styled.nav`
    height: 80px;
    background: #141b29;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 calc(2.5vw + 5px);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;

    // Small devices (landscape phones, 576px and up)
    // Medium devices (tablets, 768px and up)
    // Large devices (desktops, 992px and up)
    // Extra large devices (large desktops, 1200px and up)
    
    /* @media screen and (min-width: 576px) {
    } */
`

const NavLogo = styled.div`
    display: inline-block;
`

const Navigations = styled.div`
    display: none;

    @media screen and (min-width: 576px) {
        display: inline-block;
    }
`

// const Navul = styled.ul`
//     display: flex;
//     flex-direction: row;
//     list-style-type: none;
//     color: rgba(255, 255, 255, 1);;
//     padding-left: 0;
// `

// const Navli = styled.li`

// `

// const NavLink = styled(Link)`
//     padding: 0 15px;
//     cursor: pointer;
//     /* position: relative; */
//     color: rgba(255, 255, 255, 0.8);
//     transition: all 100ms ease-in-out;
//     text-decoration: none;

//     &:hover {
//         color: rgba(255, 255, 255, 1);
//     };
// `

const SearchContainer = styled.div`
`
