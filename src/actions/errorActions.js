import {SET_ERROR,CLEAR_ERROR} from '../utils/types'

export const seterror=(error_response)=>dispatch=>{
if(error_response.status===400 || error_response.status===404 )
dispatch({type:SET_ERROR,payload:error_response.data})
 //alert(JSON.stringify(error_response))



}