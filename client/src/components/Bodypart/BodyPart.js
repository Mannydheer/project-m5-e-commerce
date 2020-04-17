import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { GridWrapper, StyledStock, MiddlePage, PageContainer } from '../CONSTANTS';
import RenderItem from '../ItemGrid/RenderItem';
import { Link } from "react-router-dom";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import styled from 'styled-components';



const BodyPart = () => {

    const [bodyItemInfo, setBodyItemInfo] = useState(null);

    //will grab from URL
    const { body } = useParams();
    console.log(body)


    useEffect(() => {

        const handleBodyPart = async () => {
            try {
                //fetch with all items that have this body part
                let response = await fetch(`/bodypart/${body}`);
                if (response.status === 200) {
                    let data = await response.json();
                    setBodyItemInfo(data)
                }
                //Refactoring for error handling.
                else {
                    throw Error("Error fetching body part")
                }
            }
            catch (error) {
                throw Error(error, 'catch inside body part')
            }
        }

        handleBodyPart();

    }, [body])

    console.log(bodyItemInfo)

    return (
        <PageContainer>

            {bodyItemInfo !== null ? <div>
                <Title>
                    <h1>{body} Gear</h1>
                </Title>


                <GridWrapper>
                    {bodyItemInfo.map(item => {
                        return (
                            <Link style={{ position: "relative" }} to={`/item/${item.id}`}>
                                <RenderItem item={item}></RenderItem>
                                {item.numInStock == 0 && <StyledStock> Out Of <br></br>Stock</StyledStock>}
                            </Link>)
                    })}
                </GridWrapper>

            </div>
                :
                <MiddlePage><ClipLoader color={"#164C81"} size={100} /></MiddlePage>}

        </PageContainer>
    )

}

const Title = styled.div`
    font-size: 1.9rem;
    font-weight: 800; 
    margin-top: 2rem; 
    
`

export default BodyPart;