import { combineReducers } from 'redux'
import postReducer from './postReducer'
import loadingReducer from './loadingReducer'
import errorReducer from './errorReducer'

const rootReducer = combineReducers({
    postReducer: postReducer,
    loadingReducer: loadingReducer,
    errorReducer: errorReducer
})
export default rootReducer