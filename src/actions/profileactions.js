import {GET_ALL_POSTS,GET_SINGLE_POST} from './types'
import axios from 'axios'
export const fetchAllPosts=()=>dispatch=>{
   axios.get('http://3d56c63146f8.ngrok.io/api/v1/posts')
   .then(res=>{
    dispatch({type:GET_ALL_POSTS,payload:res.data})   
   })
}
