import React, { useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";


const options = [
    {
        label: 'Best Match',
        key: 'bestMatch'
    },
    {
        label: 'Price (High to Low)',
        key: 'highToLow'
    },
    {
        label: 'Price (Low to High)',
        key: 'lowToHigh'
    },


]

const SortDropdown = ({ exportFilter }) => {

    let [filter, setFilter] = useState(options[0])

    const handleFilterSelect = (selection) => {

        setFilter(selection)
        exportFilter(selection)
    }

    return (
        <Dropdown>
            <StyledButton>Sort By {filter.label} ↓</StyledButton>
            <DropdownContent>
                {options.map(option => {
                    return (

                        <SortOption key={option.key} onClick={() => handleFilterSelect(option)}><div>{option.label}</div></SortOption>

                    )
                })}
            </DropdownContent>
        </Dropdown>
    )

}

const StyledButton = styled.button`
    color: #164C81;
    font-weight: 600; 
    border: none; 
    font-size: .9rem;
    text-transform: uppercase;
    

`


const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: white;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 10;
    color: #164C81;
    font-size: .9rem;
    font-weight: 600; 
`;

const Dropdown = styled.div`
    position: absolute;
    right: 0; 
    top: -25px; 
    display: inline-block;
    z-index: 50; 
    


    &:hover ${DropdownContent} {
        display: block;
      }
    `;


const SortOption = styled.div` 

      padding: 13px 18px; 
      min-width: 200px; 
   

    &:hover  {
        cursor: pointer;
        background-color: #e3e1e1;
      }
    `;





export default SortDropdown;
