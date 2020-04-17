import { combineReducers } from 'redux';
import items from './items-reducer';
// <<<<<<< searchBar-2-manny
// // import cart from './cart-reducer';
import dataItems from './dataItems-reducer';

// export default combineReducers({ items, cart, dataItems })

import cartReducer from './cart-reducer';
import userReducer from './user-reducer';
import companiesReducer from './companies-reducer';

export default combineReducers({
    dataItems,
    cartState: cartReducer,
    items,
    userReducer,
    companiesReducer,
});
// >>>>>>> master

