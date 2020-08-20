import {GET_ALL_POSTS,GET_SINGLE_POST} from '../utils/types'
const initialState={
    posts:[],
    single_post:{}
}

export default function (state=initialState,actions){
    switch(actions.type){
        case GET_ALL_POSTS:
      alert("in redcuer"+JSON.stringify(actions.payload))
      //  alert('get all posts')
        return {...state,posts:actions.payload}
        case GET_SINGLE_POST:
      alert("in single redcuer"+JSON.stringify(actions.payload))
      //  alert('get all posts')
        return {...state,single_post:actions.payload}
        default:
        return state;

    }

}