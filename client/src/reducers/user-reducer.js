const intitialState = {
    status: 'idle',
    user: null,

};

export default function userReducer(state = intitialState, action) {
    switch (action.type) {
        case "RECEIVE_USER_DATA": {
            return {
                ...state,
                status: 'authenticated',
                user: action.user

            }
        }
        case "REQUEST_USER_DATA": {
            return {
                ...state,
                status: 'authenticating...',
            }
        }
        case "RECEIVE_USER_ERROR": {
            return {
                ...state,
                status: 'error authenticating',
            }
        }
        case "LOGOUT": {
            return {
                ...intitialState
            }
        }
        case "COUPON": {
            return {
                ...state,
                coupon: action.code
            }
        }
        default:
            return state;
    }
}