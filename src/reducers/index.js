import  {combineReducers} from 'redux'
import postReducer from './postReducer'
import loadingReducer from './loadingReducer'
import authReducer from './authReducer'

const rootReducer=combineReducers({
    postReducer:postReducer,
    loadingReducer:loadingReducer,
    authReducer:authReducer
})
export default rootReducer