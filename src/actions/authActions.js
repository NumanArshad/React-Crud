// import {SIGN_IN,SIGN_UP} from '../utils/types'
import axiosIntance from "../utils/configInterceptor"
import jwtDecode from 'jwt-decode'
// import axios from 'axios'

export const login = (signInData) => {
  const { email, password } = signInData
  axiosIntance.post('/users/login',
    { email: email, password: password })
    .then(
      res => {
        if (res.status === 200) {
          authConfig(res.data.token)
        }
      })
}

export const signup = (signInData) => {
  const { name, email, password } = signInData
  axiosIntance.post('/users/signup',
    { name: name, email: email, password: password })
    .then(
      res => {
        if (res.status === 200) {
          authConfig(res.data.token)
        }
      })
}

const authConfig = (token) => {
  localStorage.setItem('token', token)
  let { id, name, avatar } = jwtDecode(token)
  localStorage.setItem('id', id)
  localStorage.setItem('name', name)
  localStorage.setItem('avatar', avatar)
  window.location.href = "/dashboard"
}

export const logout = () => {
  localStorage.clear()
  window.location.href = "/login"
}


