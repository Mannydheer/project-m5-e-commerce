const intitialState = {
    status: 'idle',
    allItems: null,
};

export default function dataItemsReducer(state = intitialState, action) {
    switch (action.type) {
        case "RECEIVE_ALL_DATA": {
            return {
                ...state,
                status: 'success',
                allItems: action.allData

            }
        }
        case "REQUEST_ALL_DATA": {
            return {
                ...state,
                status: 'loading',
            }
        }
        case "RECEIVE_ALL_DATA_ERROR": {
            return {
                ...state,
                status: 'error',
            }
        }



        default:
            return state;
    }
}