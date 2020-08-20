import axios from 'axios'
import {GET_ALL_POSTS,GET_SINGLE_POST,START_LOADING, STOP_LOADING} from '../utils/types'
import toast from '../utils/toast'
import axiosIntance from "../utils/configInterceptor"

export const fetchAllPosts=()=>dispatch=>{
axiosIntance.get('/posts')
   .then(res=>{ 
 dispatch({type:GET_ALL_POSTS,payload:res.data})  

   })
}

export const createPost=(postText)=>dispatch=>{
     axiosIntance.post('/posts',
    {text:postText} ) 
    .then(
      res=>{
        if(res.status==200){
          dispatch(fetchAllPosts())
      }
      })
     
}

export const getSinglePost=(postId)=>dispatch=>{
 
  axiosIntance.get('/posts/'+postId )
  .then(
    res=>{
      if(res.status==200){
        dispatch({type:GET_SINGLE_POST,payload:res.data})  
  
      }
    })
   
}


export const deletePost=(postId)=>dispatch=>{
  axiosIntance.delete('/posts/'+postId)
  .then(
    res=>{
      if(res.status==200){
     dispatch(fetchAllPosts())}
    })
   
}


