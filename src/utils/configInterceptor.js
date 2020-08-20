import axios from "axios"
import { START_LOADING, STOP_LOADING } from './types'
import toast from '../utils/toast'
import store from '../store'
import {seterror} from '../actions/errorActions'
let axiosIntance = axios.create(
    {
        baseURL: process.env.REACT_APP_BASE_URL
    }
)

axiosIntance.interceptors.request.use((config) => {

  
    if (localStorage.getItem('token') &&  config.url!=="/users/login" && config.url!=="/users/signup") {
        config.headers.common['Authorization'] = localStorage.getItem('token')
    }
   
    if (config.url.split('/').length <= 2 || config.url==="/users/login" || config.url ==="/users/signup") {
     //   alert(config.url.split('/').length)
        store.dispatch({ type: START_LOADING })
    }
    return config
}, (error) => {
    alert("request" + JSON.stringify(error))
    toast.error(error)
    return Promise.reject(error)
})


axiosIntance.interceptors.response.use((response) => {

    store.dispatch({ type: STOP_LOADING })
    console.dir(response)
    return response
}, (error) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedError) {
        toast.error("Unexpected error")
    }
    else {
        toast.error(error)
      //  alert(JSON.stringify(error.response))
      store.dispatch(seterror(error.response))

    }
    store.dispatch({ type: STOP_LOADING })

    return Promise.reject(error)
})
export default axiosIntance