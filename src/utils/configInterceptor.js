import axios from "axios"
import {START_LOADING, STOP_LOADING} from './types'
import store from '../store'
let axiosIntance=axios.create(
    {
        baseURL:process.env.REACT_APP_BASE_URL
    }
)

axiosIntance.interceptors.request.use((config)=>{
     config.headers.common['Authorization']=localStorage.getItem('token')
   store.dispatch({type:START_LOADING})

    return config
},(error)=>{
    alert( JSON.stringify(error)) 
    return Promise.reject(error)
})


axiosIntance.interceptors.response.use((config)=>{
    
  store.dispatch({type:STOP_LOADING})

   return config
},(error)=>{
   alert( JSON.stringify(error)) 
   return Promise.reject(error)
})
export default axiosIntance