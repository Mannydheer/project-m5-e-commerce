import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Error = () => {


    return (<Wrapper>

        <h1>404</h1>
        <h2>Sorry but it seems like the page you are looking for was not found! </h2>
        <div><Link to={"/"}>Return to Home</Link></div>

    </Wrapper>
    )

}


export default Error;


const Wrapper = styled.div`
text-align: center;
font-size: 1rem;
padding: 10px;

a {
    color: white;
    text-decoration: none;
    background-color: #164C81;
    padding: 7px;
    border-radius: 25px;
    

    :hover {
        opacity: 0.7;
        transition: 0.5s all ease;
    }
}
h1 {
    font-weight:700;
    font-size: 7rem;
    color: rgb(246,79,64);
}

h2 {
    padding: 10px;
    margin: 10px;
}
`

