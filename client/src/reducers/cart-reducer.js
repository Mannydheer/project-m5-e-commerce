const initialState = {
  cartCounter: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        cartCounter: state.cartCounter + 1,
        [action.item.id]: {
          ...action.item,
          quantity: 1,
        },
      };
    }

    case "REMOVE_ITEM": {
      const newState = { ...state, cartCounter: state.cartCounter - 1 };
      delete newState[action.item.id];
      return newState
    }

    case "UPDATE_QUANTITY": {
        return {
            ...state,
            [action.item.id]: {
              ...action.item,
              quantity: action.newQuantity,
            },
          };
    }

    case "CLEAR_CART": {
      return initialState;
    }

    default:
      return state;
  }
}

export const itemsSelector = (state) => {
  const items = { ...state };
  delete items.cartCounter;
  return Object.values(items);
};

// useSelector
// if no stock no add to cart
// POST to change quantity
