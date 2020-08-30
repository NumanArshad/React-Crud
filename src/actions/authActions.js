import axiosIntance from "../utils/configInterceptor"
import jwtDecode from 'jwt-decode'
import toast from '../utils/toast'
import { history } from "../Routes"

export const login = (signInData) => {
    const { email, password } = signInData
    axiosIntance.post('/users/login', { email: email, password: password })
        .then(
            res => {
                if (res.status === 200) {
                    toast.success("Login successfully.")
                    let { id, name, avatar } = jwtDecode(res.data.token)
                    authConfig(id, name, avatar, res.data.token)
                }
            })
}

export const signup = (signInData) => {
    const { name, email, password } = signInData
    axiosIntance.post('/users/signup', { name: name, email: email, password: password })
        .then(res => {
            if (res.status === 200) {
                toast.success("SignUp successfully.")
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
        history.push("/dashboard")
    } else {
        history.push("/login")
    }
}

export const logout = () => {

    localStorage.clear()
    toast.success("Logout successfully.")
    history.replace("/login")

}