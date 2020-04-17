import React, { useState, Component } from "react";
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Search from '../Search/Search';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select'



const categories = [
    'Fitness',
    'Medical',
    'Lifestyle',
    'Entertainment',
    'Industrial',
    'Pets and Animals',
    'Gaming'
]
const bodyLocation = [
    'Head',
    'Neck',
    'Chest',
    'Arms',
    'Wrist',
    'Waist',
    'Hands',
    'Feet'
]


const Sidebar = () => {


    const { allCompanies } = useSelector(state => state.companiesReducer)
    const allDataFetchSuccess = useSelector(items => items.dataItems.status);
    const { status } = useSelector(state => state.companiesReducer)

    const [companyList, setCompanyList] = useState(null);

    const handleSelect = (e) => {
        const target = e.value;
        const companyObj = allCompanies.filter(company => company.name === target);
        window.location = `/sellers/${companyObj[0].id}`
    }

    let sortedCompanies;
    let selectOptions = [];

    if (allCompanies != null) {
        console.log(allCompanies)
        sortedCompanies = allCompanies.sort((a, b) => ((a.name < b.name) ? -1 : 0));

        sortedCompanies.forEach(company => {
            selectOptions.push({ value: company.name, label: company.name })
        })
        console.log(selectOptions)
    }






    return (
        <SidebarContainer>


            {/* {allDataFetchSuccess === 'success' && <Search></Search>} */}

            {/* <PriceSortContainer>
                <SidebarHeading>Filter By Price</SidebarHeading>
                <SidebarBody>$ 0-100</SidebarBody>
                <SidebarBody>$ 101-500</SidebarBody>
                <SidebarBody>$ 501-1000</SidebarBody>

            </PriceSortContainer> */}
            <CategoriesContainer>
                <SidebarHeading>Filter by Company</SidebarHeading>

                {/* <StyledSelect defaultValue="All" onChange={handleSelect}>
                    <option disabled="disabled" >All</option>
                    {sortedCompanies != null ? sortedCompanies.map((company) => (
                        <>
                            <option key={company.name} value={company.name}>{company.name}</option>
                        </>
                    )
                    )
                        :
                        <option value="" disabled="disabled" >LOADING</option>
                    }
                </StyledSelect> */}

                {selectOptions.length != 0 && <Select placeholder="All" onChange={handleSelect} options={selectOptions} />}



            </CategoriesContainer>
            <CategoriesContainer>
                <SidebarHeading>PRODUCT CATEGORIES</SidebarHeading>
                {categories.map(category => {
                    return (

                        <NavigationLink key={category} exact to={`/category/${category}`} activeStyle={{ color: "#164C81", fontWeight: "600" }} ><SidebarBody>{category}</SidebarBody></NavigationLink>
                    )
                })}
                <NavigationLink exact to="/"><SidebarBody>All Items</SidebarBody></NavigationLink>
            </CategoriesContainer>
            <CategoriesContainer>
                <SidebarHeading>Body Locations</SidebarHeading>
                {bodyLocation.map(bodyPart => {
                    return (

                        <NavigationLink key={bodyPart} exact to={`/bodypart/${bodyPart}`} activeStyle={{ color: "#164C81", fontWeight: "600" }} ><SidebarBody>{bodyPart}</SidebarBody></NavigationLink>
                    )
                })}
            </CategoriesContainer>


        </SidebarContainer>
    )
}

//--------------------------------- STYLES ---------------------------------



const PriceSortContainer = styled.div`
    display: flex;
    flex-direction: column;

`

const SidebarBody = styled.p`
        /* padding: 0;  */
        margin: 5px 0;
        font-size: .9rem;

        &:hover {
            opacity: .7;
        }

`

// >>>>>>> master
const NavigationLink = styled(NavLink)`
    text-decoration: none;
    color: black;
`




const SidebarHeading = styled.h3`
    font-size: .9rem;
    margin: 15px 0;
    font-weight: 600;
    text-transform: uppercase;
`

const CategoriesContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
    }
`

const StyledForm = styled.form`
    position: relative;
    margin-bottom: 80px;

    button {
        border: none;
        background: none;
        font-size: 1rem;
        position: absolute;
        right: 5px;
        top: 11px;
    }
`

const StyledInput = styled.input`
    width: 100%;
    height: 45px;
    font-size: .9rem;
    border: none;
    background: #EEEEEE;
    padding: 0 5px;

`
const StyledSelect = styled.select`
    border: 1px solid #EEEEEE; 
    height: 30px; 
    font-size: 1rem; 
    background: white; 

    &:select-selected {
        background-color: blue; 
    }

    option {
        color: red; 
        background: white; 
    }
`

const SidebarContainer = styled.div`
    margin-top: 30px;
    width: 25%;

    @media screen and (max-width: 768px) {
        width: 100%;
        display: none; 
    }
`



export default Sidebar;
