import  {combineReducers} from 'redux'
import profileReducer from './profileReducer'
import loadingReducer from './loadingReducer'
const rootReducer=combineReducers({
    profileReducer:profileReducer,
    loadingReducer:loadingReducer
})
export default rootReducer