import axios from 'axios'
import {GET_ALL_POSTS,GET_SINGLE_POST,START_LOADING, STOP_LOADING} from './types'
import toast from '../utils/toast'
import axiosIntance from "../utils/configInterceptor"
let post_base_url=process.env.REACT_APP_BASE_URL+'/posts'

export const fetchAllPosts=()=>dispatch=>{
 
    //dispatch({type:START_LOADING})
    axiosIntance.get('/posts')
   .then(res=>{
       alert("reducer"+JSON.stringify(res.data))
   // dispatch({type:STOP_LOADING})
    dispatch({type:GET_ALL_POSTS,payload:res.data})  

   }).catch(error=>
  toast.error(error))
}

export const createPost=(postText)=>dispatch=>{
    let config= {headers:{'Authorization':localStorage.getItem('token')}}
    axiosIntance.post('/posts',
    {text:postText}
    //,
    //config
    ) 
    .then(
      res=>{
        if(res.status==200){
          dispatch(fetchAllPosts())
         
    
        }
      })
      .catch(error=>
        toast.error(error))
}

export const getSinglePost=(postId)=>dispatch=>{
  // let config= {headers:{'Authorization':localStorage.getItem('token')}}
  axiosIntance.get(post_base_url+'/'+postId
  //,
  
  //config
  )
  .then(
    res=>{
      if(res.status==200){
        alert(JSON.stringify(res))
        dispatch({type:GET_SINGLE_POST,payload:res.data})  
  
      }
    })
    .catch(error=>
      toast.error(error))
}


export const deletePost=(postId)=>dispatch=>{
  dispatch({type:START_LOADING})

   let config= {headers:{'Authorization':localStorage.getItem('token')}}
   axiosIntance.delete('/posts/'+postId
  ,
  config
  )
  .then(
    res=>{
      if(res.status==200){
        alert(JSON.stringify(res))
        dispatch(fetchAllPosts())
        
  
      }
    })
    .catch(error=>
      toast.error(error))
}


