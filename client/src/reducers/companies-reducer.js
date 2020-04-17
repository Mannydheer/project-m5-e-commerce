const intitialState = {
    status: 'idle',
    allCompanies: null,
};


export default function companiesReducer(state = intitialState, action) {
    switch (action.type) {
        case "REQUEST_COMPANIES": {
            return {
                ...state,
                status: "loading",
            }
        }
        case "RECEIVE_COMPANIES": {

            return {
                ...state,
                status: "success",
                allCompanies: action.allCompanies,
            }

        }

        case "RECEIVE_COMPANIES_ERROR": {
            return {
                ...state,
                status: "error",
            }
        }

        default:
            return state;
    }

}