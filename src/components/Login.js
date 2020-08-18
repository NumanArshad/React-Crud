import React from 'react'
import axios from 'axios'
import '../index.css'
import {withRouter} from 'react-router-dom'

const Login=(props)=>{

const submitForm=()=>{
    
axios.post("http://3d56c63146f8.ngrok.io/api/v1/users/login",{email:'training@mailinator.com',password:'123456'}
)
.then(
    res=>localStorage.setItem('token',res.data.token))
.catch((error)=>alert(JSON.stringify(error)))


}

    return(
    
        <div id="login">
        <h3 classNameName="text-center text-white pt-5">Login form</h3>
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form id="login-form" className="form" action="" method="post">
                            <h3 className="text-center text-info">Login</h3>
                            <div className="form-group">
                                <label htmlFor="username" className="text-info">Username:</label><br />
                                <input type="text" name="username" id="username" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password:</label><br />
                                <input type="text" name="password" id="password" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
                                <input type="button" name="submit" className="btn btn-info btn-md" value="submit"  onClick={()=>submitForm()} />
                            </div>
                            <div id="register-link" className="text-right">
                                <a className="text-info" onClick={()=>props.history.push('/signup')}>Register here</a>
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