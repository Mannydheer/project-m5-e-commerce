import React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { PageHeadings } from '../CONSTANTS'
import industrial from '../../images/stock/industrial-image.png';
import medical from '../../images/stock/medical-img.png';
import gaming from '../../images/stock/gaming-logo.png';
import entertainment from '../../images/stock/entertain-image2.png';
import fitness from '../../images/stock/fitness-image.png';
import lifestyle from '../../images/stock/lifestyle-logo.png';
import pet from '../../images/stock/pet-image.png'



const CategoryGrid = () => {
    return (
        <>
            <PageHeadings>Product Categories</PageHeadings>
            <Parent>

                <Industrial style={{ backgroundImage: `url(${industrial})` }}>
                    <StyledLink to="/category/Industrial"> <p>Industrial</p>  </StyledLink>
                </Industrial>



                <Entertainment style={{ backgroundImage: `url(${entertainment})` }}>
                    <StyledLink to="/category/Entertainment"> <p>Entertainment</p>  </StyledLink>
                </Entertainment>
                <Lifestyle style={{ backgroundImage: `url(${lifestyle})` }}>
                    <StyledLink to="/category/Lifestyle"> <p>Lifestyle</p>  </StyledLink>
                </Lifestyle>
                <Medical style={{ backgroundImage: `url(${medical})` }}>
                    <StyledLink to="/category/Medical"> <p>Medical</p>  </StyledLink>
                </Medical>
                <Fitness style={{ backgroundImage: `url(${fitness})` }}>
                    <StyledLink to="/category/Fitness"> <p>Fitness</p>  </StyledLink>
                </Fitness>
                <Pet style={{ backgroundImage: `url(${pet})` }}>
                    <StyledLink to="/category/Pets%20and%20Animals"> <p>Pets & Animals</p>  </StyledLink>
                </Pet>

                <Gaming style={{ backgroundImage: `url(${gaming})` }}>
                    <StyledLink to="/category/Gaming"> <p>Gaming</p>  </StyledLink>
                </Gaming>


            </Parent>
        </>


    )
}

const StyledLink = styled(Link)`
    text-decoration: none; 
    width: 100%; 
    height: 100%; 
    position: absolute; 
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

`

const Parent = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    max-height: 500px; 
    min-height: 900px; 
    margin: 5rem 0; 

    div {
        transition-duration: 600ms; 
        cursor: pointer; 
        position: relative;
        opacity: .9;
        filter: grayscale(30%);
    }

    div:hover {
        transform: scale(1.05);
        opacity: 1; 
        filter: grayscale(0);

    }

    p {
        position: absolute; 
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        /* background: rgba(22, 76, 129, .5); */
        color: white; 
        padding: 20px 20px; 
        font-size: 1.8rem;
        font-weight: 600; 
    }

    @media screen and (max-width: 1000px) {

    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    margin: 30rem 0; 

    div {
        width: 100%; 
        min-height: 190px; 
        margin: 10px 0; 
    }

}

`



const Industrial = styled.div`
    grid-area: 2 / 1 / 4 / 2;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat; 
`

const Entertainment = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    background-repeat: no-repeat; 
    background-size: cover;

  
`

const Lifestyle = styled.div`
    grid-area: 1 / 2 / 3 / 3;
    background-repeat: no-repeat; 
    background-size: cover;

    @media screen and (max-width: 1000px) {
        background-position: 0 -130px; 
    }

   
`

const Medical = styled.div`
    grid-area: 1 / 3 / 2 / 5;
    background-size: cover;
    background-repeat: no-repeat; 

   
`

const Fitness = styled.div`
    grid-area: 3 / 2 / 4 / 4;
    background-position: center; 
    background-size: cover;
    background-repeat: no-repeat;

  
`

const Pet = styled.div`
    grid-area: 2 / 3 / 3 / 4;
    background-repeat: no-repeat; 
    background-size: cover;

`

const Gaming = styled.div`
    grid-area: 2 / 4 / 4 / 5;
    background-repeat: no-repeat; 
    background-size: cover;
    background-position: center;

   

`


// 'Fitness',
// 'Medical',
// 'Lifestyle',
// 'Entertainment',
// 'Industrial',
// 'Pets and Animals',
// 'Gaming'





export default CategoryGrid; 