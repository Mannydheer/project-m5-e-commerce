import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useDispatch } from "react-redux";


const PaymentMethod = () => {
    return (
        <Wrapper>
            <ButtonContainer>
                <ImageContainer src="https://upload.wikimedia.org/wikipedia/ms/thumb/e/ed/VISA_Logo.svg/1200px-VISA_Logo.svg.png" />
            </ButtonContainer>
            <ButtonContainer>
                <ImageContainer src="https://i.pinimg.com/originals/71/2a/82/712a8255113f10fed9712c7ef48bfcc4.png" />
            </ButtonContainer>
            <ButtonContainer>
                <ImageContainer src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_960_720.png" />
            </ButtonContainer>
        </Wrapper>
    )
}

//------------------ STYLES ------------------

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;

const ButtonContainer = styled.button`
    border: none;
    background: white;

    :hover {
        cursor: pointer;
    }
`;

const ImageContainer = styled.img`
    height: 100px;
    width: 200px;
    object-fit: cover;
`;

export default PaymentMethod;