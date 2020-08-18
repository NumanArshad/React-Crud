import profileReducer from './profileReducer'
import  {combineReducers} from 'redux'
const rootReducer=combineReducers({
    profileReducer:profileReducer
})
export default rootReducer