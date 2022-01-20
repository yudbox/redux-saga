import { LOAD_USER_DETAILS, LOAD_USER_DETAILS_SUCCESS, LOAD_USER_DETAILS_FAILURE } from "./actions"

const initialState = {
    loading: false,
    error: null,
    data: null,
}

export const peopleDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_DETAILS:
            return {
                ...state,
                loading: true,
            }
        
        case LOAD_USER_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            }
        case LOAD_USER_DETAILS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading:false
            }
        default:
        return state
    }
}
