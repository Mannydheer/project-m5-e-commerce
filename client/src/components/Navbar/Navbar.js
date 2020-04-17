import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { ShareIcons } from "./ShareIcons"
import { FaDiceSix } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi'
import { FiSearch, FiX } from 'react-icons/fi'
import { FaFacebookF, FaTwitter, FaPinterest, FaYoutube, FaRegUser } from 'react-icons/fa'

import Login from '../Login';
import Signup from '../Signup';
import Search from '../Search/Search';

import { logOutUser, clearCart } from '../../actions';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// ------------- COMPONENTS -------------

import { PageContainer } from "../CONSTANTS";
//---------------------------------------


const Navbar = ({ setLoginState, loginState }) => {
    const cartCounter = useSelector(state => state.cartState.cartCounter);
    const userLoggedIn = useSelector(state => state.userReducer)
    const allDataFetchSuccess = useSelector(items => items.dataItems.status);


    let history = useHistory();
    const dispatch = useDispatch();

    console.log(history)

    const currentPath = history.location.pathname;




    const [navbar, setNavbar] = useState(false);
    const [scroll, setScroll] = useState(false);

    const [triggerSearchBar, setTriggerSearchBar] = useState(false);

    function toggleNavbar() {

        if (navbar) {
            setNavbar(false)
        } else if (!navbar) {
            setNavbar(true)
        }

    }
    useEffect(() => {

        setTriggerSearchBar(false)

    }, [currentPath])

    const toggleSearchBar = () => {

        if (triggerSearchBar) {
            setTriggerSearchBar(false)
        } else if (!triggerSearchBar) {
            setTriggerSearchBar(true)
        }
    }

    const handleWindowResize = () => {
        if (window.innerWidth > 768) {
            setNavbar(false)


        }
        if (window.innerWidth < 868) {
            setTriggerSearchBar(false);
        }
    }

    const handleClick = () => {

    }


    const handleKeypress = (e) => {
        console.log(e);
        if (e.keyCode === 27) {
            setTriggerSearchBar(false)
        }

    }


    useEffect(() => {

        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);

    }, [])

    useEffect(() => {
        window.addEventListener("click", handleClick);
        window.addEventListener("keydown", handleKeypress)

        return () => window.removeEventListener("click", handleClick);

    }, [])

    const handleResetLogging = () => {
        dispatch(logOutUser());
        dispatch(clearCart());
        //set loginstate back to true to show login and sign up
        setLoginState(true)


    }


    return (

        <>
            <StyledTopBar>
                <LoginContainer>
                    <StyledUserIcon />
                    {loginState && <Login setLoginState={setLoginState}></Login>}
                    {loginState && <Signup setLoginState={setLoginState}></Signup>}
                    {!loginState && userLoggedIn.status == "authenticated" && <StyledSignUp>
                        <User>{userLoggedIn.user.name}</User>
                        <StyledButton onClick={handleResetLogging}>Logout</StyledButton>
                    </StyledSignUp>}


                </LoginContainer>
            </StyledTopBar>


            <PageContainer>

                <StyledNav>
                    <NavigationLink style={{ zIndex: "1000" }} exact to="/">
                        <Logo onClick={() => history.push('/')} >
                            <FaDiceSix size={25} style={{ marginRight: "5px", color: "#164C81", padding: "0" }} />
                            <h2>TECH 6 <span>GEAR</span></h2>
                        </Logo>
                    </NavigationLink>

                    <HiddenNavigation style={(navbar) ? { transform: "translateX(0)" } : {
                        transform: "translateX(100%)"
                    }}>
                        <ExitNavigation onClick={toggleNavbar}>
                            <FiX />
                        </ExitNavigation>
                        <OverlayMenu>

                            <HiddenNavLink onClick={toggleNavbar} to="/"><li>Home</li></HiddenNavLink>
                            <HiddenNavLink onClick={toggleNavbar} to="/shop"><li>Shop</li></HiddenNavLink>
                            <HiddenNavLink onClick={toggleNavbar} to="/cart"><li><FiShoppingCart /> {cartCounter}</li></HiddenNavLink>
                            {/* <HiddenNavLink to="/contact"><li>Contact</li></HiddenNavLink> */}
                            <LoginContainerMobile>
                                <StyledUserIcon />
                                {loginState && <Login setLoginState={setLoginState}></Login>}
                                {loginState && <Signup setLoginState={setLoginState}></Signup>}
                                {!loginState && userLoggedIn.status == "authenticated" && <StyledSignUp>
                                    <User>{userLoggedIn.user.name}</User>
                                    <StyledButton onClick={handleResetLogging}>Logout</StyledButton>
                                </StyledSignUp>}
                            </LoginContainerMobile>
                        </OverlayMenu>

                        <SocialIcons>
                            <FaFacebookF />
                            <FaTwitter />
                            <FaPinterest />
                            <FaYoutube />
                        </SocialIcons>

                    </HiddenNavigation>


                    <StyledUl >


                        <NavList style={(triggerSearchBar) ? { borderBottom: "3px solid transparent" } : { borderBottom: "3px solid transparent" }}>
                            <NavigationLink style={(triggerSearchBar) ? { opacity: "0", display: "none" } : { opacity: "1" }} exact to="/shop">Shop</NavigationLink>
                        </NavList>
                        {/* <NavList>
                        <NavigationLink style={(triggerSearchBar) ? { opacity: "0" } : { opacity: "1" }} exact to="/sellers">Sellers</NavigationLink>
                    </NavList> */}
                        <NavList style={(triggerSearchBar) ? { borderBottom: "3px solid transparent" } : { borderBottom: "3px solid transparent" }}>
                            <NavigationLink style={(triggerSearchBar) ? { opacity: "0", display: "none" } : { opacity: "1" }} exact to="/cart"><FiShoppingCart style={(triggerSearchBar) ? { opacity: "0", display: "none" } : { opacity: "1" }} /> {cartCounter}</NavigationLink>
                        </NavList>
                        <NavList >
                            <FiSearch onClick={toggleSearchBar} style={{ fontSize: "1.2rem" }} />
                        </NavList>

                        {/* <NavList>
                        <NavigationLink exact to="/contact">Contact</NavigationLink>
                    </NavList> */}
                    </StyledUl>
                    <Hamburger style={{ zIndex: "1200" }} onClick={toggleNavbar}>&#9776;</Hamburger>
                    {/* <SearchInput placeholder="Search our products..." style={(triggerSearchBar) ?
                        {
                            opacity: "1",
                            transition: "all 1s ease-in-out",
                            width: "500px",
                            zIndex: "10"
                        }
                        :
                        {
                            width: "0",
                            opacity: "0",
                            zIndex: "-10",
                            transition: "all 500ms ease-in-out"
                        }
                    } /> */}
                    {allDataFetchSuccess === 'success' && <Search triggerSearchBar={triggerSearchBar} setScroll={setScroll} scroll={scroll}></Search>}

                </StyledNav>

            </PageContainer>
        </>


    )
}

//--------------------------------- STYLES ---------------------------------

//Maybe use  styled.nav  instead
const StyledNav = styled.nav`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 50px 0;
    transition-duration: .4s;
    position: relative; 
    /* @media screen and (min-width: 768px) {
        justify-content: space-between;
    } */

`
// STYLING FOR THE TOP BAR (BLUE BAR ON TOP OF NAV)
const StyledTopBar = styled.div`
    /* position: absolute; */
    background: #164C81; 
    width: 100%; 
    color: white; 
    height: 33px;

`

const LoginContainer = styled.div`
    width: 80%; 
    height: 100%; 
    margin-left: auto; 
    margin-right: auto; 
    display: flex; 
    justify-content: flex-end;
    align-items: center;

    /* @media screen and (min-width: 768px) {
        display: none;
    } */

`
const LoginContainerMobile = styled.div`
    height: 100%; 
    display: flex; 
    justify-content: flex-end;
    align-items: center;
    font-size: .8rem;
    font-weight: 600; 
    cursor: pointer; 

    

`

const StyledUserIcon = styled(FaRegUser)`
    margin-right: 1.3rem; 
`

const StyledButton = styled.button`
    width: 70px; 
    border: none; 
    background: white; 
    color: #164C81;
    font-weight: 600; 
    border-radius: 3px; 
    margin-left: 1.2rem;
    transition-duration: 400ms; 
    cursor:pointer; 

    &:hover {
        background: #EEEEEE;
    }
`

//******************************* */


const StyledSignUp = styled.div`
display: flex;


`
const User = styled.div`
background-color: #164C81;
color: white;
font-weight: 600;
border-radius: 25px;
height: 70%;
padding: 3px 5px;



`
const NavigationLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    font-weight: 600; 
    transition-duration: 400ms; 
`

const SearchInput = styled.input`
    position: absolute; 
    right: 38px; 
    background: #EEEEEE; 
    border: 1px solid #DEDEDE; 
    border-style: solid; 
    font-size: .9rem;
    animation-duration: 400ms; 
    padding: 0 5px; 

    height: 35px; 
    top: 45px; 

    &:focus {
        outline: none;
    }

`

const Logo = styled.div`
    display: flex;
    align-items: center;
    
    border-radius: 2px; 
    padding: 5px;  
    

    h2 {
    font-weight: 700;
    padding: 0; 
    

    }
    span {
        font-weight: 400; 
    }

    

`


const HiddenNavigation = styled.div`
    position: fixed; 
    right:0; 
    width:50%;
    height: 100vh; 
    transition-duration: .7s;
    top: 0; 
    z-index: 100; 
    background-color: #333333;
    

`

const HiddenNavLink = styled(Link)`
    text-decoration: none; 
`

const ExitNavigation = styled.div`
    color: white; 
    position: absolute; 
    right: 20px;
    top: 4.5rem; 
    font-size: 1.7rem; 
    transition-duration: 400ms;
    cursor: pointer; 

    &:hover {
        color: #8E8E8E; 
    }

`

const OverlayMenu = styled.ul`
    display: flex; 
    /* align-items: center; */
    flex-direction: column;
    /* position: fixed; */
    top: 0; 
    background-color: inherit;
    color: white; 
    margin: 0; 
    padding-right: 4rem;
    padding-bottom: 20px; 
    margin: 7rem 0;
    width: 100%;
    text-align: right;
    border-bottom: 1px solid #454545; 
    /* height: 100vh;  */
    z-index: 100; 
    font-size: 1.1rem;
    /* opacity: .9; */


    li {
        list-style: none;
        font-weight: 500;
        font-size: 1.2rem;
        text-transform: uppercase; 
        /* margin: 5px 0;  */
        padding: 1.2rem 0; 
        cursor: pointer;
        color: #FFFFFF; 
        /* border-bottom: 2px solid #164C81; */
        width: 100%; 
        transition-duration: 300ms;

        &:hover {
        /* border-bottom: 3px solid #164C81; */
        /* background: #EEEEEE; */
        color: #8E8E8E; 
        }
    }

`

const SocialIcons = styled.div`
    display: flex; 
    justify-content: space-evenly; 
    color: #9E9E9E;  
    padding: 0 10px; 
    margin-top: 40px; 
    font-size: 1.5rem;

`

const StyledUl = styled.ul`
z-index: 20;
    display: flex;
    justify-content: space-evenly;
    display: none;
    padding-inline-start: 0;
    transition-duration: 400ms; 


    @media screen and (min-width: 768px) {
        display: flex;
    }
`

const Hamburger = styled.h2`
    position: absolute;
    right: 0;
    top: 0;
    /* padding-right: 8rem; */
    padding-top: 50px;

    margin: 0;
    cursor: pointer;

    @media screen and (min-width: 768px) {
        display: none;
    }
`

const NavList = styled.li`
    list-style: none;
    padding: 0 10px;
    padding-bottom:10px;
    margin: 0 10px; 
    cursor: pointer;
    transition-duration: 400ms; 
    border-bottom: 3px solid transparent;

    :last-of-type {
        margin-right: 0; 
    }

    &:hover {
        border-bottom: 3px solid #164C81;
    }
`

const ContentContainer = styled.div`

`

export default Navbar;