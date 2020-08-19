import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button,Form } from 'react-bootstrap'

const CreateEditProfile = ({ show, handleClose,createPost,singlePost}) => {

 const[postText,handlePostText]=useState('')

const [showModal,setShow]=useState(show)
const handleSubmit=()=>{
  createPost(postText)
  handleClose()
  
}

useEffect(()=>{
 setShow(show)
 if(Object.entries(singlePost).length>0){
      setShow(!show)
      handlePostText(singlePost.text)
 }
 
   
},[show,singlePost])




  return (
    <>


      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>post message</Form.Label>
              <Form.Control type="text" placeholder="Enter post text" 
              value={postText}
              onChange={(e)=>handlePostText(e.target.value)}  />
             
            </Form.Group>

         
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
