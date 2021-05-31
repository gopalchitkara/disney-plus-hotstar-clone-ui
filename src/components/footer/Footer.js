import React from 'react'
import styled from 'styled-components/macro'

function Footer() {
    return (
        <FooterContainer>
            <FooterLeft>
                <ul>
                    <li>About Disney+ Hotstar</li>
                    <li>Terms Of Use</li>
                    <li>Privacy Policy</li>
                    <li>FAQ</li>
                    <li>Feedback</li>
                </ul>
                <p>
                    © 2021 STAR. All Rights Reserved. HBO, Home Box Office and all related channel and programming logos are service marks of, and all related programming visuals and elements are the property of, Home Box Office, Inc. All rights reserved.
                </p>
            </FooterLeft>
            <FooterRight>
                <SocialLinks>
                    <h5>Connect with us</h5>
                    <SocialButtons>
                        <Button>
                            <i className="fab fa-linkedin fa-2x"></i>
                        </Button>
                        <Button>
                            <i className="fas fa-envelope fa-2x"></i>
                        </Button>
                    </SocialButtons>
                </SocialLinks>
            </FooterRight>
        </FooterContainer>
    )
}

export default Footer

const FooterContainer = styled.div`
    margin-top: 80px;
    margin-bottom: 30px;
    padding: 0 calc(2.5vw + 10px);
    display: flex;
    flex-direction: row;
`

const FooterLeft = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;

    ul {
        display: flex;
        flex-direction: row;
        list-style: none;
        margin-left: -10px;
    }

    ul li {
        margin: 0 10px;
        font-size: 0.9rem;
    }

    p {
        margin-top: 15px;
        font-size: 0.8rem;
        padding-right: 80px;
        line-height: 1.6;
    }
`
const FooterRight = styled.div`
    display: flex;
    flex-direction: row;
    width: 40%;
    justify-content: flex-end;
`

const SocialLinks = styled.div`
    display: inline-block;
`

const SocialButtons = styled.div`
    display: flex;
    flex-direction: row;
`
const Button = styled.div`
    margin-top: 10px;
    margin-right: 25px;
    cursor: pointer;

    &:hover {
        /* color: rgba(255,255,255,1); */
        color: #1f80e0;
    }
`