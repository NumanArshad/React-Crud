import { combineReducers } from 'redux'
import postReducer from './postReducer'
import loadingReducer from './loadingReducer'
import profileReducer from './profileReducer'
import errorReducer from './errorReducer'
const rootReducer = combineReducers({
    postReducer: postReducer,
    loadingReducer: loadingReducer,
    errorReducer: errorReducer,
    profileReducer:profileReducer
})
export default rootReducer