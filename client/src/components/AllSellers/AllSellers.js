import React from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { PageHeadings } from '../CONSTANTS';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'

// client/src/images/stock/SellerImages/Casio.jpg



const AllSellers = () => {

    //Companies from redux store
    const { allCompanies } = useSelector(state => state.companiesReducer)


    const scrollRef = React.useRef();

    const scrollLeft = (ref) => {
        scrollRef.current.scrollBy(-300, 0)
    }
    const scrollRight = (ref) => {
        scrollRef.current.scrollBy(300, 0)
    }

    const executeScrollLeft = () => scrollLeft(scrollRef);
    const executeScrollRight = () => scrollRight(scrollRef);

    return (
        <>
            <PageHeadings>Featured Sellers</PageHeadings>
            <Container>

                <StyledScrollLeft onClick={executeScrollLeft}>
                    <FaCaretLeft />
                </StyledScrollLeft>
                <Wrapper ref={scrollRef} style={{ scrollBehavior: "smooth" }}>
                    {allCompanies && allCompanies.map(company => {
                        return (
                            <ContentContainer key={company.name}>
                                <Link to={`/sellers/${company.id}`}>
                                    <p>{company.name}</p>
                                </Link>
                                <a href={company.url} target="_blank">Visit Website</a>
                            </ContentContainer>


                        )

                    })}
                </Wrapper>
                <StyledScrollRight onClick={executeScrollRight}>
                    <FaCaretRight />
                </StyledScrollRight>
            </Container>
        </>

    )
}

// const CompanyContainer = styled.div`
//     display: flex; 
//     justify-content: space-between; 
//     flex-wrap: wrap; 
//     padding: 0 100px; 
//     margin: 50px 45px; 
//     text-align: center; 

// `

const Wrapper = styled.div`
    overflow: auto;
    white-space: nowrap;
    width: 100%;
    display: flex;
    overflow: hidden; 
    align-items:center;

    a {
        text-decoration: none;
    }


@media only screen and (max-width: 600px) {
    overflow-y: hidden;
    
}
`

const Container = styled.div`
    position: relative;
    height: 100%; 
    margin-top: 3rem;

`

const StyledScrollLeft = styled.div`
    position: absolute; 
    left: -4.5rem;
    top: 0%;  
    z-index: 10; 
    font-size:4rem; 
    cursor: pointer;

`
const StyledScrollRight = styled.div`
    position: absolute; 
    right: -4.5rem;
    top: 0%;  
    z-index: 10; 
    font-size:4rem; 
    cursor: pointer;

`

const ContentContainer = styled.div`
    opacity: .7; 
    transition-duration: 500ms;     
    margin-bottom: 30px; 
    display: flex; 
    flex-direction: column; 
    position: relative; 

    p {
        margin: 5px 45px; 
        text-transform: uppercase; 
        text-decoration: none; 
        color: black;
        font-size: 1.8rem; 
        opacity: .8; 
        font-weight: 700; 
        z-index: 5; 
   
    }
    a:last-of-type { 
        margin: 0; 
        padding: 0;
        font-size: 1rem; 
        text-align: center;  
        text-decoration: none; 
        color: black;
        opacity:0;
        transition-duration: 400ms; 
        padding-top: 10px; 
        position: absolute; 
        bottom: -22px; 
        left: 50%; 
        transform: translateX(-50%);
    
        &:hover {
            opacity: 1;
        }


    }
    &:hover {
            opacity: 1; 
            transform: scale(1.1); 
        }

    
`

export default AllSellers; 