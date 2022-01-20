import { BLOG_LOADED } from "./actions"

const initial = {
    blog: {}
};

export function appReducer(state = initial, action) {
    switch (action.type) {
        case BLOG_LOADED:
            return {
                ...state,
                blog: action.payload,
            }

    }
    return state;
}
