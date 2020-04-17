import React, { useState, useEffect } from "react";
import styled, { keyframes } from 'styled-components';
import { updateQuantity, removeItem } from "../actions";
import { useDispatch } from "react-redux";
import { AddToCart } from './CartFunctions';
import { StyledStock } from './CONSTANTS';


const CartItem = (props) => {
  const [subtotal, setSubtotal] = useState(props.price);
  const dispatch = useDispatch();

  const handleQuantity = (event) => {
    const value = event.target.value;
    if (value > props.numInStock) {
      return
    } else {
      dispatch(updateQuantity(props, parseInt(value)));
    }

  };

  useEffect(() => {
    if (props.price) {
    setSubtotal(props.price.slice(1) * props.quantity);
    }
  }, [handleQuantity]);

  return (
    <form>
      <Container>
        <Products>
          <ButtonContainer>
            <StyledRemoveItemButton onClick={() => dispatch(removeItem(props))}>❌</StyledRemoveItemButton>
          </ButtonContainer>
          <ImageContainer src={props.imageSrc} />
          {/* manny - will show out of stock with new updated cart state */}

        </Products>
        <div style={{ gridArea: "1 / 4 / 2 / 5" }}>
          <GreyP>{props.price}</GreyP>
        </div>
        <div style={{ gridArea: "1 / 5 / 2 / 6", zIndex: "2" }}>
          {props.numInStock == 0 ? <span>OUT OF STOCK</span>
            :
            <StyledInput
              type="number"
              min="1"
              value={props.quantity}
              onChange={handleQuantity}
            />}
        </div>
        <div style={{ gridArea: "1 / 6 / 2 / 7" }}>
          <GreyP>${Math.round(subtotal * 100) / 100}</GreyP>
        </div>
      </Container>

      <MobileContainer>
        <MobileProducts>
          <StyledRemoveItemButton onClick={() => dispatch(removeItem(props))}>❌</StyledRemoveItemButton>
          <ImageContainer src={props.imageSrc} />
        </MobileProducts>

        <MobileProducts>
          <div>
            <StyledInput
              type="number"
              min="1"
              value={props.quantity}
              onChange={handleQuantity}
            />
          </div>
          <div>
            <GreyP>${Math.round(subtotal * 100) / 100}</GreyP>
          </div>
        </MobileProducts>
      </MobileContainer>
    </form>
  );
};

//------------------ STYLES ------------------

const Container = styled.div`
@media only screen and (min-width: 630px) {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    justify-items: center;
    align-items: center;
    border-top: 1px solid grey;
}
@media screen and (max-width: 629px) {
    display: none;
}
`;

const MobileContainer = styled.div`
@media only screen and (max-width: 630px) {
    margin: 20px;
    display: block;
    border-bottom: 1px solid grey;
}
@media screen and (min-width: 629px) {
    display: none;
}
`;

const MobileProducts = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`;

const Products = styled.div`
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: 1 / 1 / 2 / 4;
`;

const slideIn = keyframes`
    from {
        transform: translateX(20px);
        /* opacity: 0;  */
    }
    to {
        transform: translateY(0);
        opacity: 1; 
    }
`
const ButtonContainer = styled.div`
    grid-area: 1 / 1 / 2 / 7;
    transition-duration: 600ms; 
    opacity: 0;
    margin-left: 25%;
    position: absolute;
    width: 90%;
    
    :hover {
        animation: ${slideIn} 500ms forwards;
    }
`

const StyledRemoveItemButton = styled.button`
    background-color: transparent;
    margin: 20px;
    border: none;

    :hover {
        cursor: pointer;
    }
`

const ImageContainer = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
`;

const GreyP = styled.p`
  color: grey;
  margin: 0 20px;
  font-size: 15px;
`;

const StyledInput = styled.input`
    background: none; 
    border: none;
    width: 60px; 
    font-size: 15px; 
    text-align: center;
`

export default CartItem;
