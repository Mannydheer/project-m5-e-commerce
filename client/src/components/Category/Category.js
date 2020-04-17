import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import RenderItem from '../ItemGrid/RenderItem';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addItem, requestItemData, receivedItemData, receivedItemDataError } from '../../actions';
import Sidebar from '../Sidebar';
import { SideAndGrid, GridContainer, GridWrapper, PageContainer, StyledStock } from '../CONSTANTS'

const fitness = require('../../images/stock/fitness-image1.jpg');
const gaming = require('../../images/stock/gaming2.jpg')
const entertainment = require('../../images/stock/entertain-image1.jpg')
const industrial = require('../../images/stock/industrial2.jpg')
const lifestyle = require('../../images/stock/lifestyle-logo1.jpg')
const medical = require('../../images/stock/medical-img.png');
const pet = require('../../images/stock/pet-image1.jpg')

const Category = () => {


    const array = {
        "Fitness": fitness,
        "Gaming": gaming,
        "Entertainment": entertainment,
        "Industrial": industrial,
        "Lifestyle": lifestyle,
        "Medical": medical,
        "PetsandAnimals": pet
    }


    const dispatch = useDispatch();
    //renamed same as itemGrid. 
    const currentItems = useSelector(itemState => itemState.items);
    //state will hold list of the current categories items.
    let [pageCount, setPageCounter] = useState(1);
    // grab category from the url
    const { category } = useParams();

    const categoryNoSpace = category.replace(/\s+/g, '')


    useEffect(() => {

        dispatch(requestItemData())
        //hit endpoint and will return all Objects within that category.
        fetch(`/category/${category}?page=${pageCount}&limit=9`)
            .then(res => res.json())
            .then(data => dispatch(receivedItemData(data)))
            .catch(() => dispatch(receivedItemDataError()))

        //on change of the category params, this will re-fetch. 
        //try to reuse ItemGrid component?
    }, [category, pageCount])
    // <<<<<<< searchBar-2-manny

    if (currentItems.items != null) {
        console.log(currentItems.items.length)

    }

    return (
        <React.Fragment>



            {currentItems.items !== null && currentItems.status === 'success' &&
                <PageContainer>

                    <StyledHeaderImg style={{ backgroundImage: `url(${array[categoryNoSpace]})` }}>
                        <h1>{category}</h1>

                    </StyledHeaderImg>



                    <SideAndGrid>
                        <Sidebar />
                        <GridContainer>
                            <GridWrapper>
                                {currentItems.items.map(item => {
                                    return <Link style={{ position: "relative" }} key={item.id} to={`/item/${item.id}`}>
                                        <RenderItem item={item}></RenderItem>
                                        {item.numInStock == 0 && <StyledStock>Out of <br></br> Stock </StyledStock>}

                                    </Link>
                                })}
                            </GridWrapper>
                            <ButtonWrapper>
                                {pageCount > 1 && <button onClick={() => setPageCounter(pageCount -= 1)}>
                                    ←
                      </button>}
                                {currentItems.items.length > 8 &&
                                    <>
                                        <button onClick={() => setPageCounter(pageCount)}>{pageCount}</button>
                                        <button onClick={() => setPageCounter(pageCount + 1)}>{pageCount + 1}</button>
                                        <button onClick={() => setPageCounter(pageCount + 2)}>{pageCount + 2}</button>
                                        <button onClick={() => setPageCounter(pageCount += 1)}>
                                            →
                                </button>
                                    </>}
                            </ButtonWrapper>
                        </GridContainer>
                    </SideAndGrid>
                </PageContainer>
            }



        </React.Fragment>

    )

}

const StyledHeaderImg = styled.div`

    background-size: cover; 
    background-position: left; 
    background-repeat: no-repeat; 
    height: 500px; 
    

    position: relative; 

    h1 {
        position: absolute; 
        bottom: 10rem;
        left: 6rem;  
        font-size: 3.5rem;
        font-weight: 800; 
    }
    @media screen and (max-width: 600px) {

        h1 {
            left: 5rem; 
        }


    }
`


const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
padding: 20px;

button {
    padding: 0 15px 0 15px;
    height: 40px; 
    background: none; 
    border: 2px solid #164C81;
    color: #164C81;
    font-size: 1rem; 
    &:hover {
        cursor: pointer;
        background: #FAFAFA; 
    }
}
`
export default Category;


