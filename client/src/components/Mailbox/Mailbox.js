import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCouponCode } from '../../actions';
import styled from 'styled-components';
import { StyledStock, MiddlePage } from '../CONSTANTS';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";








const MailBox = () => {

    const userLoggedIn = useSelector(state => state.userReducer)

    const dispatch = useDispatch();




    useEffect(() => {


        if (userLoggedIn.status === "authenticated") {
            fetch(`/getEmails/${userLoggedIn.user.name}`)
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    dispatch(getCouponCode(data.CouponCode))
                })
        }

    }, [])






    return <>
        {userLoggedIn.status === "authenticated" ? <Wrapper>
            <div>
                <Coupon>Coupon Codes</Coupon>
                <Code>
                    {userLoggedIn.coupon}
                    <Btn to='/cart?apply'>Apply</Btn>

                </Code>

            </div>
        </Wrapper> : <MiddlePage><ClipLoader color={"#164C81"} size={100} /></MiddlePage>


        }

    </>

}

export default MailBox;


const Wrapper = styled.div`
display: flex;
justify-content: center;

`

const Coupon = styled.div`
font-size: 2rem;

`
const Code = styled.div`
font-size: 1.2rem;
border: solid black 3px;
border-radius: 25px;
padding: 10px;

`

const Btn = styled(Link)`
    margin: 20px;
    border-radius: 4px;
    background: #164C81;
    width: 250px; 
    color: white; 
    text-transform: uppercase; 
    height: 20px; 
    font-size: 15px; 
    font-weight: 600;
    text-align: center;
    align-content: center;
    text-decoration: none;
    padding: 5px;




`