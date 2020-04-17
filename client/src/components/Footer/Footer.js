import React from 'react';
import styled from 'styled-components';
import { IoIosArrowRoundForward } from 'react-icons/io'

const Footer = () => {
    return (
        <StyledFooter>
            <Wrapper>
                <Column>
                    <h3>Got a Question?</h3>
                    <h2>Get in Touch </h2>
                    <AnimatedDiv>
                        <StyledArrow />
                    </AnimatedDiv>
                </Column>
                <Column>
                    <p>1600 St-Catherine St W, Montreal, QC, H4H 2S7
                </p>
                    <span>tech6@concordiabootcamps.ca </span>
                </Column>
            </Wrapper>

        </StyledFooter>

    )
}

const StyledFooter = styled.footer`
    height: 350px; 
    background: #164C81; 
    color: white; 
    font-size: .9rem;
    padding: 60px 100px; 
    margin-top: 100px; 

`
const Wrapper = styled.div`
    display: flex; 
    align-items: center; 
    width: 100%; 
    height: 100%; 
    justify-content: space-around;

    @media screen and (max-width: 600px) {
        justify-content: space-between;
        flex-direction: column; 
        text-align: center;
    }
    
`

const Column = styled.div`

position: relative; 
    h3 {
        font-size: 1.5rem;
    }
    h2 {
        font-size: 3.2rem;
        font-weight: 600; 
    }
    p {
        font-size: 1.1rem; 
        margin-bottom: 10px; 
        width: 180px; 
    }
    span {
        color: #FF4F40; 
        font-weight: 700; 
        font-size: 1rem; 
    }

`

const AnimatedDiv = styled.div`
    position: absolute; 
    width: 100%; 
    height: 100%; 
    left: 0;
    top: 0; 
    transition-duration: 400ms;

    &:hover {
        transform: translateX(.6rem) scale(1.1);
        
    }

    @media screen and (max-width: 600px) {

        &:hover{
            transform: translateY(2rem) translateX(0); 
        } 
    }
    
`

const StyledArrow = styled(IoIosArrowRoundForward)`    
    font-size: 4rem; 
    right: -4rem;
    bottom: 5px;  
    position: absolute; 

    @media screen and (max-width: 600px) {
        transform: rotate(90deg) translateX(0px);
    }
`

export default Footer; 