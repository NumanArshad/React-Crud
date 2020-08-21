import axiosIntance from "../utils/configInterceptor"
import jwtDecode from 'jwt-decode'
import toast from '../utils/toast'

export const login = (signInData) => {
  const { email, password } = signInData
  axiosIntance.post('/users/login', { email: email, password: password })
    .then(
      res => {
        if (res.status === 200) {
          toast.success("Login Successfully")
          let { id, name, avatar } = jwtDecode(res.data.token)
          authConfig(id, name, avatar, res.data.token)
        }
      })
}

export const signup = (signInData) => {
  const { name, email, password } = signInData
  axiosIntance.post('/users/signup',
    { name: name, email: email, password: password })
    .then(res => {
      if (res.status === 200) {
        toast.success("SignUp Successfully")
        const { _id, name, avatar } = res.data
        authConfig(_id, name, avatar)
      }
    })
}

const authConfig = (id, name, avatar, token) => {
  localStorage.setItem('id', id)
  localStorage.setItem('name', name)
  localStorage.setItem('avatar', avatar)
  if (token) {
    localStorage.setItem('token', token)
    window.location.href = "/dashboard"
  }
  else {
    window.location.href = "/login"
  }
}

export const logout = () => {
  localStorage.clear()
  toast.success("Logout Successfully")
  window.location.href = "/login"
  
}


