import {START_LOADING,STOP_LOADING} from '../utils/types'
const initialState={
    loading:false
}

export default function (state=initialState,actions){
    switch(actions.type){
        case START_LOADING:
      //  alert('get all posts')
        return {...state,loading:true}
        case STOP_LOADING:
        //  alert('get all posts')
          return {...state,loading:false}
        default:
        return state;

    }

}