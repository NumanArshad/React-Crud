import {GET_ALL_POSTS,GET_SINGLE_POST} from '../actions/types'
const initialState={
    posts:[]
}

export default function (state=initialState,actions){
    switch(actions.type){
        case GET_ALL_POSTS:
      //  alert('get all posts')
        return {...state,posts:actions.payload}
        default:
        return state;

    }

}