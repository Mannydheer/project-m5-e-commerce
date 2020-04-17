const initialState = {
    items: null,
    status: 'idle',
}

export default function itemsReducer(state = initialState, action) {
    switch (action.type) {
        case 'REQUEST_ITEMS': {
            return {
                ...state,
                status: 'loading'

            }
        }
        case 'RECEIVED_ITEMS': {
            return {
                ...state,
                items: action.data,
                status: 'success'
            }
        }
        case 'RECEIVED_ITEMS_ERROR': {
            return {
                ...state,
                status: 'error'

            }
        }

        default: {
            return state;
        }
    }
}