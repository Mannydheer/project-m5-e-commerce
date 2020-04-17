import React from 'react';
import styled from 'styled-components';

const Header = ({ imgSrc, heading }) => {

    return (
        <StyledHeaderImg style={{ backgroundImage: `url(${imgSrc})` }}>
            <h1>{heading}</h1>
        </StyledHeaderImg>
    )
}

const StyledHeaderImg = styled.div`

    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat; 
    height: 500px; 
    width: 100%; 
   
    position: relative; 

    h1 {
        position: absolute; 
        bottom: 11.2rem;
        left: 11.2rem;  
        font-size: 3.5rem;
        font-weight: 800; 
    }
    @media screen and (max-width: 600px) {
        h1 {
            left: 2rem;
            bottom: 8rem; 
        }
    }
`

export default Header;