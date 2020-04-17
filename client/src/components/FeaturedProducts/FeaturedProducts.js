import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import RenderItem from '../ItemGrid/RenderItem';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeadings, StyledStock } from "../CONSTANTS"
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'

const FeaturedProducts = () => {

    const [featuredItemsArray, setFeaturedItemsArray] = useState([]);
    const featuredItems = useSelector(itemState => itemState.dataItems.allItems);
    const scrollRef = React.useRef();



    //generates 10 random items from redux store and sets them in state. 

    if (featuredItems != null) {
        let randomNumber = 0;
        for (let i = 0; i < 10; i++) {
            randomNumber = Math.floor((Math.random()) * featuredItems.length);
            featuredItemsArray.push((featuredItems[randomNumber]));
        }
    }

    // if (featuredItemsArray.length != 0) {
    //     console.log(featuredItemsArray)
    // }
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
            <PageHeadings>Featured Products</PageHeadings>
            <Container>
                <StyledScrollLeft onClick={executeScrollLeft}>
                    <FaCaretLeft />
                </StyledScrollLeft>
                <Wrapper ref={scrollRef} style={{ scrollBehavior: "smooth" }}>
                    {featuredItemsArray.length != 0 && featuredItemsArray.map(item => {
                        return (
                            <StyledLink key={item.name} to={`item/${item.id}`}>
                                <RenderItem item={item}></RenderItem>
                                {item.numInStock == 0 && <StyledStock> Out Of <br></br> Stock</StyledStock>}
                            </StyledLink>

                        )


                    })

                    }
                </Wrapper>
                <StyledScrollRight onClick={executeScrollRight}>
                    <FaCaretRight />
                </StyledScrollRight>
            </Container>
        </>
    )
}

const StyledLink = styled(Link)`
    position: relative; 
    margin: 0 2rem;
`

const Wrapper = styled.div`
    overflow: auto;
    white-space: nowrap;
    width: 100%;
    display: flex;
    overflow: hidden; 
    /* align-items:center; */
    justify-content: space-between;

    a {
        text-decoration: none;
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
    top: 50%;  
    z-index: 10; 
    font-size:4rem; 
    cursor: pointer;

`
const StyledScrollRight = styled.div`
    position: absolute; 
    right: -4.5rem;
    top: 50%;  
    z-index: 10; 
    font-size:4rem; 
    cursor: pointer;

`
export default FeaturedProducts; 