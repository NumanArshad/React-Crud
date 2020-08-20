import {SIGN_IN,SIGN_UP} from '../utils/types'
const initialState={
    isAuthenticated:false,
    
}

export default function (state=initialState,actions){
    switch(actions.type){
        case SIGN_IN:
        return {...state,isAuthenticated:true}
        case SIGN_UP:
        return {...state,isAuthenticated:true}

        default:
        return state;

    }

}