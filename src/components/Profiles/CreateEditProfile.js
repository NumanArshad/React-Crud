import React, { useState } from 'react'
import { Form, Button, Col, Row ,Spinner} from "react-bootstrap"
import  axiosIntance from "../../utils/configInterceptor"
const CreateEditProfile = () => {
    const [formData, handleData] = useState({ handle: '', status: 'active', skills: [] })
    const { handle, status, skills } = formData

    const handleStatus = (status) => {
        handleData({ ...formData, status: status })
    }

    const handleSkills = (newSkill) => {
        let allSkills = skills
        if (allSkills.find((sk) => sk == newSkill) !== undefined) {
            allSkills = allSkills.filter((sk) => sk != newSkill)
        }
        else {
            allSkills = [...allSkills, newSkill]
        }
        handleData({ ...formData, skills: allSkills })
    }

    const handleSubmit=()=>{
        
axiosIntance.post('/profile',{
handle:handle,status:status,
skills:skills.toString()
}).then((res)=>
alert(JSON.stringify(res)))
    }

    return (
        <div className="container" style={{ marginTop: '60px' }}>
            <Form className="col-6 mx-auto">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Handle</Form.Label>
                    <Form.Control type="text" placeholder="Enter handle" value={handle} onChange={(e) => handleData({ ...formData, handle: e.target.value })} />

                </Form.Group>
                {/* <Form.Group controlId="formBasicPassword">
                    <Form.Label>Status</Form.Label>
                    <Form.Control type="status" placeholder="status" value={status} onChange={(e) => handleData({ ...formData, status: e.target.value })} />
                </Form.Group> */}
                <Form.Group>
                    <Form.Label >
                        Radios
                    </Form.Label>
                    {/* <Col sm={10}> */}
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
                    {/* </Col> */}
                </Form.Group>

                <Form.Group>
                    <Form.Label >
                        Skills
                    </Form.Label>
                    {/* <Col sm={10}> */}
                    <Form.Check
                        onClick={() => handleSkills("Js")}
                        label="Js"
                        name="formHorizontalChecked"
                        id="formHorizontalChecked1"
                    />
                    <Form.Check
                        onClick={() => handleSkills("React")}
                        label="React"
                        name="formHorizontalChecked"
                        id="formHorizontalChecked2"
                    />
                    <Form.Check
                        onClick={() => handleSkills("Node")}
                        label="Node"
                        name="formHorizontalChecked"
                        id="formHorizontalChecked3"

                    />
                    {/* </Col> */}
                </Form.Group>




                <Button variant="primary" onClick={()=>handleSubmit()}>
                    Submit
        </Button>



            </Form>
            <Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>
        </div>
    )

}
export default CreateEditProfile