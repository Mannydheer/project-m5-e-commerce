import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useParams, Link } from "react-router-dom"
import { updateQuantity, removeItem } from "../../actions";
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../actions';
// import { itemsReducer } from '../../reducers/items-reducer';
import { isInCartSelector } from '../../reducers/cart-reducer';
import { PageContainer, MiddlePage, PageHeadings, StyledButton } from '../CONSTANTS';
import RelatedItems from './RelatedItems';
import ClipLoader from "react-spinners/ClipLoader";
import { GoPlus } from 'react-icons/go';
import { FiShoppingCart } from 'react-icons/fi';


const Item = (props) => {
    const [itemInfo, setItemInfo] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [quantity, setQuantity] = useState(0);
    // const [inCartAnimation, setInCartAnimation] = useState([]);
    const inCart = useSelector(state => isInCartSelector(state.cartState, itemInfo ? itemInfo.id : undefined));

    const dispatch = useDispatch();

    const { id } = useParams();

    const handleQuantity = (event) => {
        const value = event.target.value;
        if (value > itemInfo.numInStock) {
            return
        } else {
            setQuantity(parseInt(value));
            console.log('quantity: ', quantity);
        }
    };

    const handleAddToCart = (intemInfo, e) => {
        dispatch(addItem({ ...itemInfo, quantity: quantity }));
        // let itemId = e.target.id;
        // if (!inCart) {
        //     setInCartAnimation([
        //         ...inCartAnimation,
        //         {

        //             id: id
        //         }

        //     ]);
        // }


    }
    // if (inCartAnimation.length != 0) {
    //     console.log(inCartAnimation)
    // }

    useEffect(() => {

        const handleItemDetailInfo = async () => {

            let responseId = await fetch(`/items/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
            })
            let idInfo = await responseId.json();
            setItemInfo(idInfo)
            setLoaded(true)

        }
        handleItemDetailInfo();
    }, [id]);

    if (!loaded) {
        return null
    }
    console.log(itemInfo.id)

    return (
        <React.Fragment>
            <PageContainer>



                {itemInfo !== null ?
                    <FlexContainer>
                        <TitleContainer>
                            <h1>Item Details</h1>
                            <span>see more <StyledLink to={`/category/${itemInfo.category}`}>{itemInfo.category}</StyledLink> items</span>
                        </TitleContainer>

                        <Row>
                            <ImageContainer>
                                <img src={itemInfo.imageSrc} />
                            </ImageContainer>
                            <Column>
                                <h2>{itemInfo.price}</h2>
                                <p>{itemInfo.name}</p>

                                <StyledLink to={`/sellers/${itemInfo.companyId}`}>
                                    <p>
                                        See More Items from {itemInfo.name.split(" ")[0]}
                                    </p>
                                </StyledLink>




                                <CartButtonContainer>
                                    {itemInfo.numInStock === 0 ?
                                        <>
                                            <StyledInput disabled
                                                type="text"
                                                min="1"
                                                value="N/A"
                                                placeholder="1"
                                                onChange={handleQuantity} />
                                            <StyledButton disabled
                                                onClick={() =>
                                                    dispatch(addItem(itemInfo))}>
                                                Out of stock</StyledButton>
                                        </>
                                        :
                                        <>
                                            <StyledInput
                                                type="number"
                                                min="1"
                                                value={itemInfo.quantity}
                                                placeholder="1"
                                                onChange={handleQuantity} />
                                            {!inCart &&
                                                //>>>>>>> master
                                                <StyledButton
                                                    onClick={(e) => handleAddToCart(itemInfo, e)}>
                                                    Add to cart</StyledButton>
                                            }

                                            {inCart && <ButtonAnimation>
                                                <ButtonContent>
                                                    <StyledCart /> Added
                                                </ButtonContent>
                                            </ButtonAnimation>}
                                        </>
                                    }

                                </CartButtonContainer>

                            </Column>

                        </Row>

                        <PageHeadings>Similar {itemInfo.category} Items</PageHeadings>



                        {itemInfo !== null && <RelatedItems itemInfo={itemInfo}></RelatedItems>}

                    </FlexContainer> :


                    // add spinner loading.
                    <div><MiddlePage><ClipLoader color={"#164C81"} size={100} /></MiddlePage></div>}
            </PageContainer>
        </React.Fragment>
    )
}


const scaleUpCart = keyframes`
    0 {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
`

const fillButton = keyframes`
    from {
        background-position: right bottom; 
    }
    to {
        background-position: left bottom; 
    }
`


const opacity = keyframes`
    from {
        opacity: 0
    }
    to {
        opacity: 1
    }
`

const ButtonContent = styled.div`
    animation: ${opacity} 550ms ease 450ms forwards, ${scaleUpCart} 850ms ease 500ms forwards; 
    opacity: 0; 
`

const StyledCart = styled(FiShoppingCart)`
    animation: ${scaleUpCart} 1s ease;
    margin-right: 0 15px; 
`

const ButtonAnimation = styled(StyledButton)`
    background: linear-gradient(to right, #FF4F40 50%, #164C81 50%);
    background-size: 200% 100%;
    background-position: left bottom; 
    animation: ${fillButton} 1s ease; 
`




const FlexContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    margin-top: 5rem; 

    @media screen and (max-width: 600px) {
        
        justify-content: center; 
        
    }


`

const TitleContainer = styled.div`
    
    margin-bottom: 70px; 
    text-align: center;
    width: 100%; 
    

    h1 {
        margin: 0; 
        padding: 0; 
        font-size: 4rem;
        font-weight: 800;
    }

    span {
        margin: 0; 
        padding: 0; 
        color: #4A4F6A;
        font-weight: 600; 
        text-transform: lowercase; 
        
    }
`



const Row = styled.div`
    display: flex; 
    justify-content: center; 

    @media screen and (max-width: 600px) {
        flex-direction: column; 
        align-items: center;
        align-content: center; 
    }

`

const ImageContainer = styled.div`

    width: 100%; 
    img {
        width: 100%; 
    }


    `

const Column = styled.div`

    display: flex; 
    flex-direction: column;
    align-items: flex-start;
    margin-left: 60px; 

    h2 {
        font-size: 2.2rem;
        font-weight: 600; 
    }
    p {
        font-size: 1.3rem; 
    }

    @media screen and (max-width: 600px) {
        align-items: center;
        margin-top: 3rem;
        margin-left: 0; 

        p{
            text-align: center; 
        }
    }

`

const CartButtonContainer = styled.div`
    display: flex; 
    margin: 50px 0;
    
`
const StyledInput = styled.input`
    background: none; 
    border: none;
    border-bottom: 2px solid #EEEEEE;
    width: 60px; 
    font-size: 1.5rem; 
    text-align: center;

`

// const StyledButton = styled.button`
//     background: #164C81;
//     width: 235px; 
//     color: white; 
//     text-transform: uppercase; 
//     height: 55px; 
//     font-size: .8rem; 
//     margin-left: 10px; 
//     font-weight: 600; 


// `

const StyledLink = styled(Link)`
    color: inherit; 
    text-decoration: none; 
    p {
        font-size: .9rem;
        font-weight: 600; 
        color: #164C81;
    }
`

export default connect(null, { addItem })(Item); 