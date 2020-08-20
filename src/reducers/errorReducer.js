import {SET_ERROR,CLEAR_ERROR} from '../utils/types'
const initialState={
    errors:{}
}

export default function (state=initialState,actions){
    switch(actions.type){
        case SET_ERROR:
        alert(JSON.stringify(actions.payload))
        return {...state,errors:actions.payload}
        case CLEAR_ERROR:
         alert('clear errro')
          return {...state,errors:{}}
        default:
        return state;

    }

}