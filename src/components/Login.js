import React, { useState } from 'react'
import axios from 'axios'
//import '../index.css'
import { withRouter } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import toast from '../utils/toast'
import joi from "joi-browser"
import { Form, Button } from 'react-bootstrap'
import { customValidator } from "../utils/formValidation"
const Login = ({ history }) => {

  const [formData, setFormData] = useState({ email: '', password: '' })
  const { email, password } = formData
  const [error, setError] = useState({})
  const schema = joi.object().keys({
    email: joi.string().required().error(() => {
      return {
        message: 'email is required.',
      }
    }),
    password: joi.string().min(8).required().error(() => {
      return {
        message: 'password is required.',
      }
    }),
  });
  const submitForm = () => {
   
  
    if(validateForm()){
      
       alert("called")
    axios.post("http://5147acf5eea1.ngrok.io/api/v1/users/login", { email: email, password: password }
    ).then(
      res => {
        if (res.status == 200) {
          localStorage.setItem('token', res.data.token)
          let { id, name, avater } = jwtDecode(res.data.token)
          localStorage.setItem('id', id)
          localStorage.setItem('name', name)
          localStorage.setItem('avatar', avater)
          history.push('/dashboard')
        }
      })
      .catch((error) => {
        toast.error(error)
      })
    }
  }

  const validateForm=()=>{
    let isValidated=true
    setError({})
    let errors = customValidator({email:email,password:password}, schema)
    alert(JSON.stringify(errors))
    if (Object.keys(errors).length > 0) {
      
      setError(errors)
      isValidated=false
      
    }
    return isValidated
  }

// const validateProperty=(name,value)=>{
//  const obj = {
//     [name]: value
// };
// const fieldSchema = {
//     [name]: schema[name]
// };

// alert("single"+JSON.stringify(schema["email"]))

//     let errors = customValidator(obj, fieldSchema)
//     // if (Object.keys(errors).length > 0) {
//     //    alert("single"+JSON.stringify(errors))
//     //   setError(errors)
     
      
//     // }
    
// //return result
// // const result = Joi.validate(obj, fieldSchema);
// }





  return (
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
                    //onBlur={()=>validateProperty('email',email)}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <div class="invalid">
                    {error?.email?.msg}
                                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="text-info">Password:</label><br />
                  <input type="text" name="password" id="password" className="form-control"
                    value={password}
                  //  onBlur={()=>validateProperty('password')}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <span className="invalid">{error?.password?.msg}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
                  <input type="button" name="submit" className="btn btn-info btn-md" value="submit" onClick={() => submitForm()} />
                  <span></span>
                </div>
                <div id="register-link" className="text-right">
                  <a className="text-info" onClick={() => history.push('/signup')}
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


// import { customValidator } from "../utils/formValidation"
// import joi from "joi-browser"
// var schema = joi.object().keys({
//   username: joi.string().required().error(() => {
//     return {
//       message: 'Challenge type is required.',
//     }
//   }),
//   password: joi.string().min(8).required().error(() => {
//     return {
//       message: 'good type is required.',
//     }
//   }),
// });

// let errors = customValidator({ username: "", password: "uueg" }, schema)

// alert(JSON.stringify(errors))



// class Login extends React.Component {
//   render() {
//     const {
//       user: { username, password },
//       errors, changeHandler, validateHandler 
//     } = this.props;

//     return(
//       <div >
//         <input type="text"
//           value={username}
//           onChange={ changeHandler('username') }
//           onBlur={ validateHandler('username') }
//         />

//         <span > fkenng </span>

//         <input type="password"
//           value={password}
//           onChange={ changeHandler('password') }
//           onBlur={ validateHandler('password') }
//         />

//         <span > { errors.password } </span>

//         <input type="Submit" value="Sign In" />
//       </div>
//     );
//   }
// }


