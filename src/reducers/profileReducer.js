import { GET_PROFILE } from '../utils/types'
const initialState = {
    profile: {}
}

export default function (state = initialState, actions) {
    switch (actions.type) {
        case GET_PROFILE:
            return { ...state, profile: actions.payload }
        default:
            return state;
    }

}