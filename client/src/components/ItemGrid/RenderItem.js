import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingCart } from "react-icons/fi"
import { addItem } from '../../actions';
import { isInCartSelector } from '../../reducers/cart-reducer';
import { FaCheckCircle } from 'react-icons/fa'


const RenderItem = ({ item }) => {
    const inCart = useSelector(state => isInCartSelector(state.cartState, item.id));

    const handleButtonClick = (item, e) => {
        e.preventDefault();
        dispatch(addItem(item))
        console.log(e);

    }

    const dispatch = useDispatch();

    return (
        <MainContainer>
            <ImageContainer >


                <img src={item.imageSrc} />
                <TitleContainer>
                    <p>{`${item.name.split(" ")[1]} ${item.name.split(" ")[2]} ${item.name.split(" ")[3]}`}</p>
                    <Price>{item.price}</Price>
                </TitleContainer>

                <DescriptionContainer>

                    {!inCart && item.numInStock > 0 && <StyledBuyBtn onClick={(e) => handleButtonClick(item, e)}>BUY IT NOW <StyledShoppingCart size={15} /> </StyledBuyBtn>
                    }

                    {inCart && <StyledBuyBtn disabled> <StyledCheck /> IN CART</StyledBuyBtn>}
                </DescriptionContainer>

            </ImageContainer>
        </MainContainer>

    )
}

const MainContainer = styled.div`
    position: relative; 
    height: 100%; 
    width: 100%; 
`

const scaleUp = keyframes`
    0 {
        transform: scale(0);
    }
    50% {
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
`

const StyledCheck = styled(FaCheckCircle)`
    margin-right: 1rem;
    animation: ${scaleUp} 700ms ease forwards; 
`

const slideUp = keyframes`
    from {
        transform: translateY(20px);
        /* opacity: 0;  */
    }
    to {
        transform: translateX(0);
        opacity: 1; 
    }
`

const ImageContainer = styled.div`
    background: white;
    min-width: 200px;
    min-height: 390px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 5; 
    left: 50%; 
    top: 50%; 
    transform: translate(-50%, -50%);
    position: relative;  

    &:hover {
        opacity: .8; 
    }
`
const TitleContainer = styled.div`
    position: absolute;
    bottom: 20px;
    left: 0;
    display: flex; 
    justify-content: flex-start; 
    flex-direction: column;
    width: 100%; 
    font-size: 1rem;
    font-weight: 500; 
    color: black; 
    /* border-bottom: 2px solid #333333;  */

    p{
        padding: 0; 
        margin: 0; 
    }

    @media screen and (max-width: 600px) {
        font-size: 1.1rem;
    }
`

const Price = styled.p`
    
    font-weight: 800; 
    font-size: 1rem; 
    bottom: 0; 
    left: 0; 
    color: #4A4F6A;

    @media screen and (max-width: 600px) {
        font-size: 1.1rem;
    }
`

const DescriptionContainer = styled.div`
    position: absolute; 
    align-items: flex-end;
    bottom: 20px;
    left: 0px; 
    padding-left: 40px; 

    display: flex; 
    justify-content: space-between;
    width: 100%; 
    height: 100%; 
    /* cursor: pointer; */
    /* padding: 0 15px;  */
    transition-duration: 600ms; 
    opacity: 0; 
    /* border: 1px solid red;  */
    &:hover {
        animation: ${slideUp} 500ms forwards; 
    }    
    
`

const StyledBuyBtn = styled.button`
    bottom: 0;
    padding: 0 3px; 
    left: 4rem; 
    position: absolute; 
    font-size: .9rem;
    font-weight: 900; 
    background: transparent; 
    margin: 0; 
    color: #164C81; 
    cursor: pointer;
    border: none;
    text-align: center; 
    border-radius: 5px; 
    align-items:center;
    display: flex; 
    z-index: 500; 
    
    
   
`




const StyledShoppingCart = styled(FiShoppingCart)`
    margin-left: 5px; 
`


export default RenderItem;