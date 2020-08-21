import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import joi from "joi-browser"
import { login } from "../actions/authActions"
import { customValidator } from "../utils/formValidation"
import { useSelector } from "react-redux"
import {Helmet} from "react-helmet"

const Login = ({ history }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { email, password } = formData
  const [error, setError] = useState({})
  const { errors: customError } = useSelector(state => state.errorReducer)


  useEffect(() => {
    setError(customError)
  }, [customError])

  const schema = {
    email: joi.string().email({ minDomainSegments: 2 }).error(() => {
      return {
        message: 'email is required.',
      }
    }),
    password: joi.string().min(6).required().error(() => {
      return {
        message: 'password length must be atleast 6.',
      }
    }),
  };

  const {loading}=useSelector(state=>state.loadingReducer)

  const submitForm = () => {
    if (validateForm()) {
      login(formData)
    }
  }

  const validateForm = () => {
    let isValidated = true
    setError({})
    console.dir(schema)
    let errors = customValidator({ email: email, password: password }, schema)
    if (Object.keys(errors).length > 0) {
      setError(errors)
      isValidated = false
    }
    return isValidated
  }

  const validateProperty = (name, value) => {
    const obj = {
      [name]: value
    };
    const fieldSchema = {
      [name]: schema[name]
    };
    let errors = customValidator(obj, fieldSchema)
    setError({ ...error, [name]: errors[name] })
  }
  const signup=(event)=>{
    event.preventDefault()
    history.push('/signup')
  }

  return (
    <div id="login">
    <Helmet>
          <title>Login | Crud App</title>
        </Helmet>
      <div className="container">
        <div id="login-row" className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6">
            <div id="login-box login-height" className="col-md-12">
              <form id="login-form" className="form" action="" method="post">
                <h3 className="text-center text-info">Login</h3>
                <div className="form-group">
                  <label htmlFor="username" className="text-info">Username:</label><br />
                  <input type="text" name="username" id="username" className="form-control"
                    value={email} onBlur={() => validateProperty('email', email)}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <div class="invalid">
                    {error?.email}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="text-info">Password:</label><br />
                  <input type="password" name="password" id="password" className="form-control"
                    value={password} onBlur={() => validateProperty('password', password)}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                  <span className="invalid">{error?.password}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
                  <input type="button" name="submit" className="btn btn-info btn-md" value={loading? "Login processing...":'Login'} onClick={() => submitForm()} />
                </div>
                <div id="register-link" className="text-right">
                  <a className="text-info" href="/" onClick={(event) => signup(event)}>Register here</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>)
}
export default withRouter(Login)
