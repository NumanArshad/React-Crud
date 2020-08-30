
import React, { useState, useEffect } from 'react'
import joi from "joi-browser"
import { signup } from "../actions/authActions"
import { customValidator } from "../utils/formValidation"
import { useSelector } from "react-redux"

const SignUp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState({})
    const { name, email, password } = formData

    const schema = {
        name: joi.string().required().error(() => {
            return {
                message: 'Name is required.',
            }
        }),
        email: joi.string().email({ minDomainSegments: 2 }).error(([{ context: { value } }]) => {
            return {
                message: !value ? "Email is required." : "Invalid email.",
            }
        }),
        password: joi.string().min(6).required().error(([{ context: { value } }]) => {
            return {
                message: !value ? "Password is required." : "Password length must be atleast 6."
            }
        })
    };

    const submitForm = () => {
        if (validateForm()) {
            signup(formData)
        }
    }

    const validateForm = () => {
        let isValidated = true
        setError({})
        console.dir(schema)
        let errors = customValidator({ name: name, email: email, password: password }, schema)
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

    const { errors: customError } = useSelector(state => state.errorReducer)
    useEffect(() => {
        document.title = "SignUp | Crud App"

        setError(customError)
    }, [customError])

    const { loading } = useSelector(state => state.loadingReducer)

    return (
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
                                        value={name}
                                        onBlur={() => validateProperty('name', name)}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    <div class="invalid">
                                        {error?.name}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Email" className="text-info">Email:</label><br />
                                    <input type="email" name="Email" id="Email" className="form-control"
                                        value={email}
                                        onBlur={() => validateProperty('email', email)}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    <div class="invalid">
                                        {error?.email}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-info">Password:</label><br />
                                    <input type="text" name="password" id="password"
                                        onBlur={() => validateProperty('password', password)}
                                        className="form-control" value={password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                    <div class="invalid">
                                        {error?.password}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
                                    <input type="button" name="submit" className="btn btn-info btn-md" value={loading ? "SignUp processing..." : 'SignUp'} onClick={() => submitForm()} />
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