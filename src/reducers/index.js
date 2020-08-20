import  {combineReducers} from 'redux'
import postReducer from './postReducer'
import loadingReducer from './loadingReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
const rootReducer=combineReducers({
    postReducer:postReducer,
    loadingReducer:loadingReducer,
    authReducer:authReducer,
    errorReducer:errorReducer
})
export default rootReducer