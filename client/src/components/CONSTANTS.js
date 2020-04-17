import styled from 'styled-components';


export const SideAndGrid = styled.div`
    display: flex; 
    
    /* padding: 0 100px;  */
    /* margin: 0 150px;  */
    margin-top: 100px; 
    justify-content: space-between;
    /* width: 100%;   */
    border-top: 2px solid #EEEEEE; 

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }

`

export const GridContainer = styled.div`
    /* display: flex; */
    /* justify-content: flex-end; */
    /* flex-direction: column;  */
    padding-left: 85px;
    /* margin-top: 120px; */
    /* background: #FAFAFA; */
    width: 100%;

    @media screen and (max-width: 768px) {
        padding-left: 0; 
    }
`


export const GridWrapper = styled.div`
    display: grid;
    /* grid-template-columns: repeat(auto-fill, minmax(150px, 310px)); */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr) );
    grid-column-gap: 60px;
    grid-row-gap: 10px;

    a {
        color: black;
        text-decoration: none;
    }
`

export const PageContainer = styled.div`
    /* padding: 0 8rem;  */
    width: 80%; 
    margin-left: auto; 
    margin-right: auto; 
    position: relative; 
`


export const StyledStock = styled.div`
    background-color: rgb(22,76,129);
    color: white;
    border-radius: 50%;
    font-size: .6rem;
    font-weight: 600; 
    line-height: 1.4;
    padding: 15px;
    position: absolute;
    top: 3rem;
    right: 1rem; 
    text-align: center;
    text-transform: uppercase;
    display: inline-block;
    z-index: 20;

`

export const PageHeadings = styled.h2`
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
    color: #333333;
    margin-top: 5rem; 
`

export const StyledButton = styled.button`
    background: #164C81;
    width: 15.5rem; 
    color: white; 
    text-transform: uppercase; 
    height: 3.7rem; 
    font-size: .8rem; 
    margin-left: 10px; 
    font-weight: 600; 
    border: none; 
    border-radius: 3px; 
    box-shadow: 0px 0px 10px -4px rgba(0,0,0,0.75);

    @media screen and (max-width: 600px) {

    }

`

export const MiddlePage = styled.div`
    position: absolute; 
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`