import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from "react-router-dom";
import RenderItem from './RenderItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, requestItemData, receivedItemData, receivedItemDataError } from '../../actions';
import Sidebar from '../Sidebar';
import { SideAndGrid, GridContainer, GridWrapper } from '../CONSTANTS';


const ItemGrid = () => {
    const dispatch = useDispatch();

    //for state of item reducer.
    //also has the status - can be used for loading states. 
    const currentItems = useSelector(itemState => itemState.items);

    let [pageCount, setPageCounter] = useState(1);



    //Once app renders 
    //Fetch the item data.
    useEffect(() => {
        //add logic to check to when page is 0 AND max pages.
        if (pageCount > 0 && pageCount <= 39) {
            //set the state to loading.
            dispatch(requestItemData())

            fetch(`/items?page=${pageCount}&limit=9`)
                .then(res => res.json())
                .then(data => dispatch(receivedItemData(data)))
                .catch(() => dispatch(receivedItemDataError()))
        }
        else {
            //mostly for when your typing
            setPageCounter(1)
            //change for modal
            window.alert(pageCount + 'This page does not exist.')
        }


    }, [pageCount]);

    //function that will handle page directing. 
    const handlePageFinder = (e) => {
        //change hard coded page value*******
        if (e.target.value >= 1 && e.target.value <= 39) {
            setPageCounter(e.target.value)
        }
        else {
            //change for a modal.
            window.alert(pageCount + 'This page does not exist.')
        }
    }


    return (
        <>
            <SideAndGrid>
                <Sidebar />
                {currentItems.items !== null && currentItems.status == 'success' ?
                    <GridContainer>
                        <GridWrapper>
                            {currentItems.items.map((item, arrayNum) => {
                                return (
                                    <Link to={`/item/${item.id}`}>
                                        {/*SEE INSIDE RENDER ITEM FOR DISPATCH TO ADD TO CART - MANNY */}
                                        <RenderItem item={item}></RenderItem>
                                    </Link>
                                    // >>>>>>> master
                                    // >>>>>>> master
                                )
                            })}
                        </GridWrapper>

                        {/* make this button wrapper reusableinsde category as well.  */}
                        <ButtonWrapper>
                            {pageCount > 1 && <button onClick={() => setPageCounter(pageCount -= 1)}>
                                Previous
                      </button>}
                            <button onClick={() => setPageCounter(pageCount)}>{pageCount}</button>
                            <button onClick={() => setPageCounter(pageCount + 1)}>{pageCount + 1}</button>
                            <button onClick={() => setPageCounter(pageCount + 2)}>{pageCount + 2}</button>

                            <button onClick={() => setPageCounter(pageCount += 1)}>
                                >
                      </button>
                        </ButtonWrapper>

                        {/* Search for for particular page? - is it necessary?*/}
                        {/* Missing Styling */}
                        <form>
                            <div>...current page: {pageCount}</div>
                            <input type='text' onChange={handlePageFinder}></input>
                        </form>


                    </GridContainer> : <div>LOADING</div>
                }
            </SideAndGrid>
        </>
    )
};



// =======
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



export default ItemGrid;    