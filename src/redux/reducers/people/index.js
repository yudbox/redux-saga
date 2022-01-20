import { LOAD_USERS, LOAD_USERS_FAILURE, LOAD_USERS_SUCCESS } from "./actions"

const initialState = {
    page: 1,
    search: '',
    loading: false,
    error: null,
    data: null,
}

export const peopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS:
            const { page, search } = action.payload
            
            return {
                ...state,
                loading: true,
                page,
                search
            }
        
        case LOAD_USERS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading:false
            }
        case LOAD_USERS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading:false
            }
        default:
        return state
    }
}
