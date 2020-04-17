import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RenderItem from '../ItemGrid/RenderItem';
import { Link } from "react-router-dom";
import { StyledStock, PageContainer } from '../CONSTANTS';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'


const RelatedItems = ({ itemInfo }) => {

    const [relatedItems, setRelatedItems] = useState(null)
    const scrollRef = React.useRef();

    const scrollLeft = (ref) => {
        scrollRef.current.scrollBy(-300, 0)
    }
    const scrollRight = (ref) => {
        scrollRef.current.scrollBy(300, 0)
    }

    // if (scrollRef.current != null) {
    //     // console.log(scrollRef.current.scrollLeft)
    // }

    const executeScrollLeft = () => scrollLeft(scrollRef);
    const executeScrollRight = () => scrollRight(scrollRef);

    useEffect(() => {
        const handleRelatedItems = async () => {
            try {
                let responseRelated = await fetch(`/relatedItems/${itemInfo.category}`);
                if (responseRelated.status === 200) {
                    let items = await responseRelated.json();
                    setRelatedItems(items)

                }
                else {
                    throw Error('Fetch for related items failed.')
                }
            }
            catch (error) {
                throw Error(error);
            }
        }
        handleRelatedItems();
    }, [])


    return (
        <>
            <PageContainer>
                <Container>
                    <StyledScrollLeft onClick={executeScrollLeft}>
                        <FaCaretLeft />
                    </StyledScrollLeft>
                    <Wrapper style={{ scrollBehavior: "smooth" }} ref={scrollRef} >

                        {relatedItems !== null &&
                            relatedItems.map(item => {
                                return <StyledLink key={item.id} to={`/item/${item.id}`}>

                                    <RenderItem item={item}></RenderItem>
                                    {item.numInStock == 0 && <StyledStock> Out Of<br></br> Stock</StyledStock>
                                    }

                                </StyledLink>

                            })
                        }

                    </Wrapper>
                    <StyledScrollRight onClick={executeScrollRight}>
                        <FaCaretRight />
                    </StyledScrollRight>
                </Container>
            </PageContainer>
        </>
    )

}

export default RelatedItems;

const StyledLink = styled(Link)`
    margin: 0 2.3rem; 
    position: relative; 
`

const Container = styled.div`
    position: relative;
    height: 100%; 
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

const Wrapper = styled.div`
    overflow: auto;
    white-space: nowrap;
    width: 100%;
    display: flex;
    overflow: hidden; 

    a {
        text-decoration: none;
    }


@media only screen and (max-width: 600px) {
    overflow-y: hidden;
    
}
`