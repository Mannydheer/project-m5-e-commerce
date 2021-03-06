import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom"
import styled from 'styled-components';
import RenderItem from '../ItemGrid/RenderItem';
import Sidebar from '../Sidebar';
import SortDropdown from '../SortDropdown';
import { SideAndGrid, GridContainer, GridWrapper, PageContainer } from '../CONSTANTS';
import ReusableGrid from '../ReusableGrid/index';



const SearchPage = () => {
    const [searched, setSearched] = useState(null)
    let query = window.location.pathname.replace("/searching/", '')
    const [sortState, setSortState] = useState('bestMatch')
    const [page, setPage] = useState(1)

    let { id } = useParams();





    useEffect(() => {
        fetch(`/search?search=${query}&page=${page}&limit=9&sort=${sortState}`)
            .then(res => res.json())
            .then(data => setSearched(data))
        //.catch(() => window.alert('Your search returned no results.'))
    }, [query, sortState, id])

    if (searched === null) {
        return (
            <div>loading</div>
        )
    }

    const test = (val) => {
        setSortState(val.key)
    }

    return (
        <ReusableGrid exportPage={(page) => setPage(page)}
            itemSource={searched} exportSort={(val) => test(val)} />
    )

}





export default SearchPage;