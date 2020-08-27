import { GET_ALL_POSTS, GET_SINGLE_POST } from '../utils/types'
import axiosIntance from "../utils/configInterceptor"
import toast from '../utils/toast'
import axios from "axios"
export const fetchAllPosts = () => dispatch => {
  axios.get('https://reqres.in/api/users')
    .then(res => {
      dispatch({ type: GET_ALL_POSTS, payload: res.data.data })
    })
}

export const createPost = (postText) => dispatch => {
  axiosIntance.post('/posts',
    { text: postText })
    .then(
      res => {
        if (res.status === 200) {
          toast.success("Post Created Successfully")
          dispatch(fetchAllPosts())
        }
      })
}

export const getSinglePost = (postId) => dispatch => {
  axiosIntance.get('/posts/' + postId)
    .then(
      res => {
        if (res.status === 200) {
          dispatch({ type: GET_SINGLE_POST, payload: res.data })
        }
      })

}

export const deletePost = (postId) => dispatch => {
  axiosIntance.delete('/posts/' + postId)
    .then(
      res => {
        if (res.status === 200) {
          toast.success("Post Deleted Successfully")
          dispatch(fetchAllPosts())
        }
      })

}


