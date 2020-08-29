import { GET_PROFILE } from '../utils/types'
const initialState = {
    profile: {}
}

export default function (state = initialState, actions) {
    switch (actions.type) {
        case GET_PROFILE:
        //    alert(JSON.stringify( actions.payload))
            return { ...state, profile: actions.payload }
        default:
            return state;
    }

}