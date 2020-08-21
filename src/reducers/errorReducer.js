import { SET_ERROR } from '../utils/types'
const initialState = {
    errors: {}
}

export default function (state = initialState, actions) {
    switch (actions.type) {
        case SET_ERROR:
            return { ...state, errors: actions.payload }
      
        default:
            return state;

    }

}