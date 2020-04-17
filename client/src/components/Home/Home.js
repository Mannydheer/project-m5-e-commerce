import React from 'react';
import styled from 'styled-components';
import CategoryGrid from '../CategoryGrid';
import FeaturedProducts from '../FeaturedProducts';
import { PageContainer, StyledButton } from '../CONSTANTS';
import { Link } from 'react-router-dom';
import homeImage3 from '../../images/stock/lifestyle-logo-2.jpg'
import AllSellers from '../AllSellers/AllSellers';

const Home = () => {
    return (
        <PageContainer>

            <StyledHeaderImg style={{ backgroundImage: `url(${homeImage3})` }}>
                <div>
                    <h1>The All New G-Shock</h1>
                    <Link to='/shop'><HeaderButton>Shop Our Products</HeaderButton></Link>
                </div>
            </StyledHeaderImg>
            <FeaturedProducts />
            <CategoryGrid />
            <AllSellers />



        </PageContainer>
    )
}

const StyledHeaderImg = styled.div`
    background-size: cover; 
    background-repeat: no-repeat; 
    height: 45rem; 
    position: relative; 
    background-position: right; 
    div{
        position: absolute; 
        top: 18rem;
        left: 8rem;  
        position: absolute;

       
    }


    h1 {
        font-size: 4rem;
        font-weight: 800; 
        color: White; 
        
    }

    @media screen and (max-width: 600px) {
        
        background-position: top; 
        height: 55rem;

        div{
            left: 2rem;
            top: 39rem;
        }
        
        h1 {
            font-size: 3rem;
        }

            
    }
`

const HeaderButton = styled(StyledButton)`
    position: absolute; 
    cursor: pointer;
    font-size: 1rem;
`




export default Home; 