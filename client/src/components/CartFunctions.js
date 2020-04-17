import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { isInCartSelector } from '../reducers/cart-reducer';
import { addItem, updateQuantity, removeItem } from '../actions';



export const AddToCart = (props) => {
    const [itemInfo, setItemInfo] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const inCart = useSelector(state => isInCartSelector(state.cartState, itemInfo ? itemInfo.id : undefined));

    const dispatch = useDispatch();
    const { id } = useParams();

    const handleQuantity = (event) => {
        const value = event.target.value;
        if (value > props.numInStock) {
            return
        } else {
            dispatch(updateQuantity(props, parseInt(value)));
        }

    };

    useEffect(() => {
        const handleItemDetailInfo = async () => {

            let responseId = await fetch(`/items/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
            })
            let idInfo = await responseId.json();
            setItemInfo(idInfo)
            setLoaded(true)

        }
        handleItemDetailInfo();
    }, [id]);

    if (!loaded) {
        return null
    }

    return (
        <CartButtonContainer>
            <StyledInput
                type="number"
                min="1"
                value={props.quantity}
                placeholder="1"
                onChange={handleQuantity} />
            {!inCart &&
                <StyledButton
                    onClick={() =>
                        dispatch(addItem(itemInfo))}>
                    Add to cart</StyledButton>}
            {inCart && <p>Added to cart</p>}
        </CartButtonContainer>
    )

}

//------------------------------------ STYLES ------------------------------------

const CartButtonContainer = styled.div`
@media only screen and (min-width: 1025px) {
    display: flex; 
    margin: 50px 0; 
}

@media only screen and (max-width: 1024px) {
    display: grid;
}
`
const StyledInput = styled.input`
    background: none; 
    border: none;
    border-bottom: 2px solid #EEEEEE;
    width: 60px; 
    font-size: 1.5rem; 
    text-align: center;
`

const StyledButton = styled.button`
    background: #164C81;
    width: 235px; 
    color: white; 
    text-transform: uppercase; 
    height: 55px; 
    font-size: .8rem; 
    margin-left: 10px; 
    font-weight: 600; 
`