import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCouponCode } from '../../actions';
import styled from 'styled-components';
import { StyledStock, MiddlePage } from '../CONSTANTS';
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useLocation } from "react-router-dom";








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
                    console.log(data)
                    dispatch(getCouponCode(data.CouponCode))
                })
        }
    }, [])






    return <>
        {userLoggedIn.status === "authenticated" && userLoggedIn.coupon ? <Wrapper>
            <div>
                <Coupon>Coupon Codes</Coupon>
                {userLoggedIn.coupon.map(coupon => {
                    return (
                        <Code>
                            {coupon.code}
                            <div>{coupon.discount}%</div>
                            <Btn to={`/cart?apply?${coupon.code}`}>Apply</Btn>
                        </Code>

                    )
                })}


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
padding: 5px;
text-align: center;

`

const Btn = styled(Link)`
    margin: 10px;
    border-radius: 4px;
    background: #164C81;
    width: 200px; 
    color: white; 
    text-transform: uppercase; 
    height: 15px; 
    font-size: 15px; 
    font-weight: 600;
    text-align: center;
    align-content: center;
    text-decoration: none;
    padding: 5px;




`