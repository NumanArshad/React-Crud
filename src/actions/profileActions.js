import { GET_PROFILE } from '../utils/types'
import axiosIntance from "../utils/configInterceptor"
import toast from '../utils/toast'
export const getprofile = () => dispatch => {
    axiosIntance.get('/profile')
        .then(res => {
            dispatch({ type: GET_PROFILE, payload: res.data })
        })
}

export const updateProfile = (postText) => dispatch => {
    axiosIntance.post('/profile', { data: postText })
        .then(
            res => {
                if (res.status === 201) {
                    toast.success("Profile updated successfully.")
                    dispatch(getprofile())
                }
            })
}