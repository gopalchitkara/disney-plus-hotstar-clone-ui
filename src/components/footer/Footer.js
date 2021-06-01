import React, { Fragment } from 'react'
import styled from 'styled-components/macro'

function Footer() {
    return (
        <Fragment>
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
                        HBO, Home Box Office and all related channel and programming logos are service marks of, and all related programming visuals and elements are the property of, Home Box Office, Inc. and are only used in this clone for learning and educational purposes. All rights reserved by them. © 2021 STAR. All Rights Reserved by them.
                </p>
                </FooterLeft>
                <FooterRight>
                    <SocialLinks>
                        <h5>Contact</h5>
                        <SocialButtons>
                            <Button>
                                <a href="https://www.linkedin.com/in/gopalchitkara/" target="_blank" rel="noreferrer">
                                    <LinkIcon className="fab fa-linkedin fa-2x"></LinkIcon>
                                </a>
                            </Button>
                            <Button>
                                <a href="mailto:gopal.chitkara@gmail.com">
                                    <LinkIcon className="fas fa-envelope fa-2x"></LinkIcon>
                                </a>
                            </Button>
                            <Button>
                                <a href="https://github.com/gopalchitkara/" target="_blank" rel="noreferrer">
                                    <LinkIcon className="fab fa-github fa-2x"></LinkIcon>
                                </a>
                            </Button>
                        </SocialButtons>
                    </SocialLinks>
                </FooterRight>
            </FooterContainer>
            <FooterMobile>
                <p>
                    HBO, Home Box Office and all related channel and programming logos are service marks of, and all related programming visuals and elements are the property of, Home Box Office, Inc. and are only used in this clone for learning and educational purposes. All rights reserved by them. © 2021 STAR. All Rights Reserved by them.
                </p>
            </FooterMobile>
        </Fragment>
    )
}

export default Footer

const FooterMobile = styled.div`
    margin-top: -20px;
    margin-bottom: 30px;
    padding: 0 calc(2.5vw + 10px);
    display: block;

    p{
        font-size: 0.8rem;
        line-height: 1.4;
    }

    @media screen and (min-width: 768px) {
        display: none;
    }
`

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
        flex-direction: column;
        list-style: none;
        margin-left: -5px;
    }

    ul li {
        margin-top: 2px;
        margin-bottom: 2px;
        margin-left: 5px;
        margin-right: 5px;
        font-size: 0.9rem;
        cursor: pointer;
        
        &:hover{
            color: #1f80e0;
        }
    }

    p {
        display: none;
        margin-top: 15px;
        font-size: 0.8rem;
        padding-right: 80px;
        line-height: 1.6;
    }


    @media screen and (min-width: 768px) {
        ul {
            flex-direction: row;
        }
        p {
            display: block;
        }
    }

    @media screen and (min-width: 992px) {
        ul {
            margin-left: -15px;
        }
        ul li {
            margin-left: 15px;
            margin-right: 15px;
        }
    }

    @media screen and (min-width: 1200px) {
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

const LinkIcon = styled.i`
    color: rgba(255,255,255);
    &:hover {
        /* color: rgba(255,255,255,1); */
        color: #1f80e0;
    }
`

const Button = styled.div`
    margin-top: 10px;
    margin-right: 25px;
    cursor: pointer;
`