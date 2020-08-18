import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button,Form } from 'react-bootstrap'
import axios from 'axios'

const CreateEditProfile = ({ show, handleClose, fetchResponse}) => {

 const[postText,handlePostText]=useState('')


const handleSubmit=()=>{
  
  let config= {headers:{'Authorization':localStorage.getItem('token')}}
  axios.post("http://3d56c63146f8.ngrok.io/api/v1/posts",
  {text:postText},
 config
)
.then(
    res=>{
      if(res.status==200){
        handleClose()
        fetchResponse()

      }
      res.status==200 && fetchResponse()})
.catch((error)=>alert(JSON.stringify(error)))

}


  return (
    <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>post message</Form.Label>
              <Form.Control type="text" placeholder="Enter post text" onChange={(e)=>handlePostText(e.target.value)}  />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            {/* <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group> */}
            {/* <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" onClick={handleSubmit}>
              Submit
       </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateEditProfile
