import React, { useState } from 'react';
import styled from 'styled-components';
import SortDropdown from '../SortDropdown/index';
import RenderItem from '../ItemGrid/RenderItem';
import Sidebar from '../Sidebar';
import { Link } from "react-router-dom";

import { SideAndGrid, GridContainer, GridWrapper, PageContainer } from '../CONSTANTS';


const ReusableGrid = ({ itemSource, exportPage, exportSort }) => {
    let [pageCount, setPageCounter] = useState(1);
    let [sortState, setSortState] = useState('bestMatch')



    const test = (val) => {
        console.log("testing exportFilter", val)
        setSortState(val.key)

    }
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


    const handleOnClick = (page) => {

        setPageCounter(page)
        exportPage(page)
        console.log("handleFilterSelect fired in SortDropdown", page)
    }

    if (itemSource === null) {
        return (
            <div>loading</div>
        )
    }


    const good = (val) => {
        console.log("testing exportFilter", val)
        setSortState(val.key)
        exportSort(val)

    }

    return (
        <>
            <h1 style={{ width: "80%", margin: "auto" }}>Search Results</h1>
            <PageContainer>


                <SideAndGrid>
                    <SortDropdown exportFilter={(val) => good(val)}></SortDropdown>

                    <Sidebar />

                    <GridContainer>
                        <GridWrapper>



                            {itemSource.map((item, arrayNum) => {
                                return (
                                    <Link to={`/item/${item.id}`}>
                                        {/*SEE INSIDE RENDER ITEM FOR DISPATCH TO ADD TO CART - MANNY */}
                                        <RenderItem key={item.id} item={item}></RenderItem>
                                    </Link>
                                    // >>>>>>> master
                                    // >>>>>>> master
                                )
                            })}
                        </GridWrapper>
                        {/* make this button wrapper reusableinsde category as well.  */}
                        <ButtonWrapper>

                            {pageCount > 1 && <button onClick={() => handleOnClick(pageCount -= 1)}>
                                Previous

                  </button>}
                            <button onClick={() => handleOnClick(pageCount)}>{pageCount}</button>
                            <button onClick={() => handleOnClick(pageCount + 1)}>{pageCount + 1}</button>
                            <button onClick={() => handleOnClick(pageCount + 2)}>{pageCount + 2}</button>
                            <button onClick={() => handleOnClick(pageCount += 1)}>
                                >
                  </button>
                        </ButtonWrapper>
                    </GridContainer>

                </SideAndGrid>
            </PageContainer>
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
export default ReusableGrid;