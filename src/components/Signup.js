
import React, { useState } from 'react'
import '../index.css'
import axios from 'axios'
const SignUp=({history})=>{
    const [formData,setFormData]=useState({email:'',password:''})
    const {name,email,password}=formData
    const submitForm=()=>{
        
       
    axios.post("http://5147acf5eea1.ngrok.io/api/v1/users/signup",{name:name,email:email,password:password}
    )
    .then(
        res=>{
            if(res.status==200){
                localStorage.setItem('token',res.data.token)
               history.push('/dashboard')
                    }})
    .catch((error)=>alert(JSON.stringify(error)))
    
    
    }
    
        return(
        
            <div id="login">
            
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box signUp-height" className="col-md-12">
                            <form id="login-form" className="form" action="" method="post">
                                <h3 className="text-center text-info">SignUp</h3>
                     
                                <div className="form-group">
                                    <label htmlFor="username" className="text-info">Username:</label><br />
                                    <input type="text" name="username" id="username" className="form-control"
                                    value={email}
                                    onChange={(e)=>setFormData({...formData,name:e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Email" className="text-info">Email:</label><br />
                                    <input type="email" name="Email" id="Email" className="form-control"
                                    value={email}
                                    onChange={(e)=>setFormData({...formData,email:e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-info">Password:</label><br />
                                    <input type="text" name="password" id="password" className="form-control" 
                                          value={password}
                                          onChange={(e)=>setFormData({...formData,password:e.target.value})}
                                    />
                                    <div className="invalid-feedback">kfnj</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
                                    <input type="button" name="submit" className="btn btn-info btn-md" value="submit"  onClick={()=>submitForm()} />
                                </div>
                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
        )
}
export default SignUp