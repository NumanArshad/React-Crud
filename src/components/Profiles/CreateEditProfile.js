
import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner } from "react-bootstrap"
import joi from "joi-browser"
import { customValidator } from "../../utils/formValidation"
import { useSelector, useDispatch } from "react-redux"
import LoaderSpinner from "../../common/Spinner"
import MapView from "./MapView"
import Chip from '@material-ui/core/Chip';
import { TextField } from '@material-ui/core';
import { getprofile, updateProfile } from "../../actions/profileActions"
import Autocomplete from '@material-ui/lab/Autocomplete';
const CreateEditProfile = () => {
    const fixedOptions = [];  //filter skills (remove if selected /add if not selected)
    const allSkills = ["Js", "React", "Node"];  //possible skills optins
    const [formData, handleData] = useState({ handle: '', status: '', skills: [...fixedOptions] })
    const { handle, status, skills } = formData
    const [error, setError] = useState({})
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.loadingReducer)
    const { profile } = useSelector(state => state.profileReducer)
    useEffect(() => {
        document.title = "Profile | Crud App"
        dispatch(getprofile())
    }, [dispatch])

    useEffect(() => {
        handleData(data => ({
            handle: profile.handle || '', status: profile.status || '',
            skills: profile?.skills || [...data.skills]
        }))
    }, [profile])

    const handleStatus = (status) => {
        handleData({ ...formData, status: status })
    }

    const handleSubmit = () => {
        if (validateForm()) {
            dispatch(updateProfile({ ...formData, skills: skills.toString() }))
            handleData({ handle: '', skills: [...fixedOptions] })
        }
    }

    const schema = {
        handle: joi.string().required().error(() => {
            return {
                message: 'handle is required.',
            }
        }),
        // status: joi.string().required().error(() => {
        //     return {
        //         message: 'status is required.',
        //     }
        // }),
        skills: joi.array().min(1).required().error(() => {
            return {
                message: 'please check atleast 1 skill.',
            }
        }),
    };
    

    const validateForm = () => {
        let isValidated = true
        setError({})
        //console.dir(schema)
        alert(JSON.stringify(skills))
        let errors = customValidator({ handle: handle, status: status, skills: skills }, schema)
        console.dir(errors)
        if (Object.keys(errors).length > 0) {
            setError(errors)
            isValidated = false
        }
        return isValidated
    }

    const validateProperty = (name, value) => {
        alert(name,value)
        const obj = {
          [name]: value
        };
        const fieldSchema = {
          [name]: schema[name]
        };
        let errors = customValidator(obj, fieldSchema)
        setError({ ...error, [name]: errors[name] })
      }

    return (
        <div className="container" style={{ marginTop: '60px' }}>
            {loading && <LoaderSpinner />}
            <Form className="col-6 mx-auto">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Handle</Form.Label>
                    <Form.Control type="text" placeholder="Enter handle" value={handle} onChange={(e) => handleData({ ...formData, handle: e.target.value })}
                    onBlur={() => validateProperty('handle', handle)}/>
                    <div class="invalid">
                        {error?.handle}
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Radios</Form.Label>
                    <Form.Check
                        onClick={(e) => handleStatus('active')}
                        type="radio"
                        label="Active"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        checked={status === 'active'}  //on profile (initial and update)load set default status
                    />

                    <Form.Check
                        onClick={(e) => handleStatus('inactive')}
                        type="radio"
                        label="In Active"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        checked={status === 'inactive'}
                    />
                </Form.Group>
                <Autocomplete
                    multiple
                    id="fixed-tags-demo"
                    value={skills}
                    onChange={(event, newValue) => {
                        handleData({
                            ...formData, skills: [
                                ...fixedOptions,
                                ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                            ]
                        });
                       
                    }}
                  //  onBlur={() => validateProperty('skills', skills)}
                    options={allSkills}
                    getOptionLabel={(option) => option}
                    renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                            <Chip
                                label={option}
                                {...getTagProps({ index })}
                            // disabled={value.indexOf(option) !== -1}
                            />
                        ))
                    }
                    style={{ width: '100%' }}
                    renderInput={(params) => (
                        <TextField {...params} label="Skills" variant="outlined" placeholder="select skills" />
                    )}
                />
                <div class="invalid">
                      {error?.skills}
                    </div>
                <Button variant="primary mt-2" onClick={() => handleSubmit()}>
                    Save
                </Button>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <MapView />
            </Form>

        </div>
    )

}

export default CreateEditProfile