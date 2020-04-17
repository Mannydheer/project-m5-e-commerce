import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useLocation, Link, useHistory } from 'react-router-dom';





const Search = ({ triggerSearchBar, setScroll, scroll }) => {
    const allData = useSelector(items => items.dataItems.allItems)
    const [query, setQuery] = useState(null)
    const [type, setTyped] = useState(' ')
    const [results, setResults] = useState(null)
    const [categoryData, setCategoryData] = useState(null)
    //will grab the url of the category. 
    let location = useLocation().pathname.split('/')
    let history = useHistory();
    console.log(location.length)




    //need to search based on category. 
    useEffect(() => {

        //on any Category endpoint
        if (location[1] === "category") {
            //grab the actual category for the ur - ex: Fitness.
            let categoryName = location[2];
            //filter data and return only those items.
            let filteredCategoryItems = allData.filter(item => {
                if (categoryName == item.category) {
                    return item;
                }
            })
            //now the search will only work for those items. 
            let matchedResults = filteredCategoryItems.filter(item => {
                if (item.name.toLowerCase().includes(type.toLowerCase()) && type.length > 3) {
                    return item
                }
            })
            setResults(matchedResults)
        }
        //if if anything but the category - you are searching for all keywords. 
        else {
            let matchedResults = allData.filter(item => {
                if (item.name.toLowerCase().includes(type.toLowerCase()) && type.length > 3) {
                    return item
                }
            })
            setResults(matchedResults)

        }

    }, [type])

    const handlePushItem = (id) => {
        history.push(`/item/${id}`)
        setTyped('')


    }

    return (
        <>
            <StyledForm action={`/searching/${type}`}>

                <SearchFlex>

                    <SearchInput value={type}
                        onChange={(e) => {
                            setScroll(true);
                            setTyped(e.target.value);
                        }

                        }
                        placeholder="Search our products..." style={(triggerSearchBar) ?
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
                        } />
                    {triggerSearchBar && <Link to={`/searching/${type}`}><button type="button" onClick={() => {

                        setQuery(type)

                    }}>Go</button></Link>}

                </SearchFlex>
            </StyledForm>
            {/* <SearchInput
                placeholder='Search Products...' ></SearchInput>
 */}


            {results !== null && triggerSearchBar && <StyledResults style={scroll ? { overflowY: "scroll" } : { overflowY: "hidden" }}>
                {results.map(result => {
                    let getIndex = result.name.toLowerCase().indexOf(type.toLowerCase())
                    let word = result.name.split('');
                    let typeLength = type.split('').length;
                    let firstHalf = word.slice(0, getIndex);
                    let bolded = word.slice(getIndex, typeLength + getIndex)
                    let secondHalf = word.slice(typeLength + getIndex, word.length)
                    console.log(firstHalf)
                    console.log(bolded)
                    console.log(secondHalf)
                    return (
                        <div >
                            <ul>
                                <EachList onClick={() => handlePushItem(result.id)}>
                                    {firstHalf}
                                    <Strong>{bolded}</Strong>
                                    {secondHalf}
                                </EachList>
                            </ul>
                        </div>
                    )
                })}
            </StyledResults>

            }


        </>
    )

}

export default Search;



const StyledResults = styled.div`
    position: absolute; 
    right: 40px;  
    top: 100px; 
    z-index: 100; 
    overflow: hidden; 
    /* overflow-y: scroll; */
    background: white; 
    width: 500px; 
    padding: 20px 50px; 
    max-height: 500px; 

    ul {
        z-index: 1000; 
        
    }

`

const EachList = styled.li`
    cursor: pointer;
    list-style: none; 
    z-index: 100; 
    padding: 5px 0; 

    &:hover {
    background-color: pink;
}
`

const StyledForm = styled.div`
    position: absolute;
    margin-bottom: 80px; 
    width: 100%;
    height:100%;
    overflow-y: hidden;
    overflow-x: hidden; 

    
    button {
        border: none; 
        background: none; 
        font-size: 1rem; 
        position: absolute;
        right: 40px;
        top: 50px;  
        z-index: 100; 
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



const Strong = styled.strong`
font-weight: bolder;

`
const SearchInput = styled.input`
    position: absolute; 
    right: 38px; 
    background: #EEEEEE; 
    border: 1px solid #DEDEDE; 
    border-style: solid; 
    font-size: .9rem;
    animation-duration: 400ms; 
    width: 100%; 

    padding: 0 5px; 

    height: 35px; 
    top: 45px; 

    &:focus {
        outline: none;
    }

`

const SearchFlex = styled.div`
    display: flex;
    position: relative; 

`


const Ul = styled.div`
position: absolute;
height: 30%;
`