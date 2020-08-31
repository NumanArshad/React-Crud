import { GET_ALL_POSTS, GET_SINGLE_POST,CLEAR_SINGLE_POST } from '../utils/types'
const initialState = {
    posts: [],
    single_post: {}
}

export default function (state = initialState, actions) {
    switch (actions.type) {
       
        case GET_ALL_POSTS:
            return { ...state, posts: actions.payload,single_post:{} }
        case GET_SINGLE_POST:
            return { ...state, single_post: actions.payload }
        case CLEAR_SINGLE_POST:
            return { ...state, single_post: {}}
        default:
       return state;
    }

}