import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner } from "react-bootstrap"
import axiosIntance from "../../utils/configInterceptor"
import joi from "joi-browser"
import { customValidator } from "../../utils/formValidation"
import toast from "../../utils/toast"
import { useSelector } from "react-redux"
import LoaderSpinner from "../../common/Spinner"
import {Helmet} from "react-helmet"
import MapView from "../MapView"
const CreateEditProfile = () => {
    const [formData, handleData] = useState({ handle: '', status: '', skills: [] })
    const { handle, status, skills } = formData
    const [error, setError] = useState({})

    useEffect(() => {
        hitEndPoint({ method: 'get', url: '/profile' })
    }, [])

    const { loading } = useSelector(state => state.loadingReducer)

    const hitEndPoint = (config) => {
        axiosIntance(config).then((res) => {
                if (config.method === "post") {
                    toast.success("Profile Updated Successfully")
                }
                const { handle, status, skills } = res.data
                handleData({ handle, status, skills })
            })
    }

    const handleStatus = (status) => {
        handleData({ ...formData, status: status })
    }
    const handleSkills = (newSkill) => {
        let allSkills = skills
        if (allSkills.find((sk) => sk === newSkill) !== undefined) {
            allSkills = allSkills.filter((sk) => sk !== newSkill)
        }
        else {
            allSkills = [...allSkills, newSkill]
        }
        handleData({ ...formData, skills: allSkills })
    }

    const handleSubmit = () => {
        if (validateForm()) {
            
            handleData({ handle: '', status: '', skills: [] })
            hitEndPoint({ method: 'post', url: '/profile', data: { handle: handle, status: status, skills: skills.toString() } })
        }
    }

    const schema = {
        handle: joi.string().required().error(() => {
            return {
                message: 'handle is required.',
            }
        }),
        status: joi.string().required().error(() => {
            return {
                message: 'status is required.',
            }
        }),
        skills: joi.array().items(joi.string()).error(() => {
            return {
                message: 'please check atleast 1 skill.',
            }
        }),
    };


    const validateForm = () => {
        let isValidated = true
        setError({})
        console.dir(schema)
        let errors = customValidator({ handle: handle, status: status, skills: skills }, schema)
        if (Object.keys(errors).length > 0) {
            setError(errors)
            isValidated = false
        }
        return isValidated
    }

    return (
        <div className="container" style={{ marginTop: '60px' }}>
         <Helmet>
          <title>Manage Profile | Crud App</title>
        </Helmet>
    
            {loading && <LoaderSpinner />}
            <Form className="col-6 mx-auto">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Handle</Form.Label>
                    <Form.Control type="text" placeholder="Enter handle" value={handle} onChange={(e) => handleData({ ...formData, handle: e.target.value })}
                    />
                    <div class="invalid">
                        {error?.handle}
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label >
                        Radios
                    </Form.Label>
                    <Form.Check
                        onClick={(e) => handleStatus('active')}
                        type="radio"
                        label="Active"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        defaultChecked
                    />
                    <Form.Check
                        onClick={(e) => handleStatus('inactive')}
                        type="radio"
                        label="In Active"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"

                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label >
                        Skills
                    </Form.Label>
                    <Form.Check
                        onClick={() => handleSkills("Js")}
                        label="Js"
                        name="formHorizontalChecked"
                        id="formHorizontalChecked1"
                        checked={skills.find((sk) => sk === "Js") && true}
                    />
                    <Form.Check
                        onClick={() => handleSkills("React")}
                        label="React"
                        name="formHorizontalChecked"
                        id="formHorizontalChecked2"
                        checked={skills.find((sk) => sk === "React") && true}

                    />
                    <Form.Check
                        onClick={() => handleSkills("Node")}
                        label="Node"
                        name="formHorizontalChecked"
                        id="formHorizontalChecked3"
                        checked={skills.find((sk) => sk === "Node") && true}

                    />
                </Form.Group>
                <Button variant="primary" onClick={() => handleSubmit()}>
                    Save {loading ? "processing..." : ''}
                </Button>
            </Form>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            <MapView />
        </div>
    )

}
export default CreateEditProfile