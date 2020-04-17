import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { useHistory } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';

const Chatbot = ({ loginState, setLoginState }) => {

    const [chatLoginColor, setChatLoginColor] = useState(true)
    let history = useHistory();


    const handlePage = (props) => {
        history.push(`/category/${props}`)
    }

    const theme = {
        background: '#164C81',
        headerBgColor: 'rgb(246,79,64)',
        headerFontColor: 'white',
        botBubbleColor: 'rgb(246,79,64)',
        botFontColor: 'white',
        userBubbleColor: 'white'
    }



    const config = {
        width: "300px",
        height: "400px",
        floating: true
    };

    const steps = [
        {
            //reffering to the step by Id
            id: 'Greet',
            message: 'Hi there!',
            //will trigger next Id
            trigger: 'Ask Name',
        },
        {
            id: 'Ask Name',
            message: 'What is your name?',
            trigger: 'Waiting for user input',
        },
        {
            id: 'Waiting for user input',
            //this will mean that the bot has to wait for the user to type something
            user: true,
            validator: (value) => {
                if (!isNaN(value)) {
                    return 'Please enter a name'
                };
                return true;

            },
            trigger: 'Welcome to Website',
        },
        {
            id: 'Welcome to Website',
            message: `Hi {previousValue}, Welcome to Six Tech Gear! What are you looking for today?`,
            trigger: 'Topic',
        },
        {
            id: 'Topic',
            options: [
                { value: "Categories", label: "Categories", trigger: () => { return "Show Categories" } },
                { value: "Item Catalog", label: "Item Catalog", trigger: () => { return "Item Catalog" } },
                { value: "Cart", label: "Cart", trigger: () => { return "Cart" } },
                { value: "Home", label: "Home", trigger: () => { return "Home" } },
                { value: "Searching", label: "Searching", trigger: () => { return "Search" } },
                { value: "Register", label: "Register", trigger: () => { return "Register" } },
                { value: "Login", label: "Login", trigger: () => { return "Login" } },
            ],
        },
        {
            id: 'Register',
            component: (
                <Signup setLoginState={setLoginState}></Signup>
            ),
            trigger: 'Topic'
        },
        {
            id: 'Login',
            component: (
                <Login chatLoginColor={chatLoginColor} setChatLoginColor={setChatLoginColor} setLoginState={setLoginState}></Login>
            ),
            trigger: 'Topic'
        },
        {
            id: 'Search',
            message: `You can use the search bar above to search for any products, also if you choose a category, you can search within that category! Looking for something else?`,
            trigger: 'Topic'
        },
        {
            id: 'Home',
            message: `Our Home Page!!! Are you looking for something else?`,
            trigger: () => { history.push('/'); return 'Topic' },
        },
        {
            id: 'Cart',
            message: `Btw you can keep track of your items if you make an account! Don't forget to add your coupon code! 
            Are you looking for something else?`,
            trigger: () => { history.push('/Cart'); return 'Topic' },
        },
        {
            id: 'Item Catalog',
            message: `This is our Shop page with a list of our items, browse away!
            Are you looking for something else?`,
            trigger: () => { history.push('/Shop'); return 'Topic' },
        },
        {
            id: 'Show Categories',
            options: [
                { value: 'Fitness', label: 'Fitness', trigger: () => { handlePage('Fitness'); return 'RedirectToCategory' } },
                { value: 'Medical', label: 'Medical', trigger: () => { handlePage('Medical'); return 'RedirectToCategory' } },
                { value: 'Lifestyle', label: 'Lifestyle', trigger: () => { handlePage('Lifestyle'); return 'RedirectToCategory' } },
                { value: 'Entertainment', label: 'Entertainment', trigger: () => { handlePage('Entertainment'); return 'RedirectToCategory' } },
                { value: 'Industrial', label: 'Industrial', trigger: () => { handlePage('Industrial'); return 'RedirectToCategory' } },
                { value: 'Pets and Animals', label: 'Pets and Animals', trigger: () => { handlePage('Pets and Animals'); return 'RedirectToCategory' } },
                { value: 'Gaming', label: 'Gaming', trigger: () => { handlePage('Gaming'); return 'RedirectToCategory' } },
            ],
        },
        {
            id: 'RedirectToCategory',
            message: `Here are the products for your selected category.Looking for something else?`,
            trigger: 'Topic',
        }
    ]

    return <div>

        <ThemeProvider theme={theme}>
            <ChatBot
                // userAvatar={'client/public/logo192.png'}
                headerTitle={'Tech 6 Gear Bot'}
                botAvatar={"https://img.icons8.com/dusk/64/000000/bot.png"}
                botDelay={1000}
                floating={true}

                steps={steps} {...config}
            />
        </ThemeProvider>
    </div>


}

export default Chatbot;