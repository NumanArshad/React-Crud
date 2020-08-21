import { START_LOADING, STOP_LOADING } from '../utils/types'
const initialState = {
    loading: false
}

export default function (state = initialState, actions) {
    switch (actions.type) {
        case START_LOADING:
            return { ...state, loading: true }
        case STOP_LOADING:
            return { ...state, loading: false }
        default:
            return state;
    }

}