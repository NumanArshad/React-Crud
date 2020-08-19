import React, { useState } from 'react'
import axios from 'axios'
import '../index.css'
import {withRouter} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import toast from '../utils/toast'
const Login=({history})=>{
    //alert(JSON.stringify(history))
const [formData,setFormData]=useState({email:'',password:''})
const {email,password}=formData

const submitForm=()=>{
    
   
axios.post("http://5147acf5eea1.ngrok.io/api/v1/users/login",{email:email,password:password}
)
.then(
    res=>{
        if(res.status==200){
            localStorage.setItem('token',res.data.token)
            let {id,name,avater}=jwtDecode(res.data.token)
            localStorage.setItem('id',id)
            localStorage.setItem('name',name)
            localStorage.setItem('avatar',avater)
         
           history.push('/dashboard')
                }})
        
.catch((error)=>{
toast.error(error)
            }
)


}

    return(
    
        <div id="login">
        
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box login-height" className="col-md-12">
                        <form id="login-form" className="form" action="" method="post">
                            <h3 className="text-center text-info">Login</h3>
                 
                            <div className="form-group">
                                <label htmlFor="username" className="text-info">Username:</label><br />
                                <input type="text" name="username" id="username" className="form-control"
                                value={email}
                                onChange={(e)=>setFormData({...formData,email:e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password:</label><br />
                                <input type="text" name="password" id="password" className="form-control" 
                                      value={password}
                                      onChange={(e)=>setFormData({...formData,password:e.target.value})}
                                />
                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
                                <input type="button" name="submit" className="btn btn-info btn-md" value="submit"  onClick={()=>submitForm()} />
                            </div>
                            <div id="register-link" className="text-right">
                                <a className="text-info" onClick={()=>history.push('/signup')}
                                >Register here</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    )
}
export default withRouter(Login)