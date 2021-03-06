import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import joi from "joi-browser"
import { customValidator } from "../../utils/formValidation"
import moment from 'moment'

const CreateEditPost = ({ show, handleClose, createPost, singlePost, title }) => {
  const [postText, handlePostText] = useState('')
  const [error, setError] = useState({})

  const handleSubmit = () => {
    if (validateForm()) {
      createPost(postText)
      handleClose()
    }
  }

  const schema = {
    postText: joi.string().min(10).max(300).required().error(([{ context: { value } }]) => {
      return {
        message: !value ? "Post text is required." : "Post must be between 10 and 300 characters.",
      }
    })
  };

  const validateForm = () => {
    let isValidated = true
    setError({})
    //console.dir(schema)
    let errors = customValidator({ postText: postText }, schema)
    if (Object.keys(errors).length > 0) {
      setError(errors)
      isValidated = false
    }
    return isValidated
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>post message</Form.Label>
              <Form.Control type="text" placeholder="Enter post text"
                value={title === "View" ? singlePost?.text : postText}
                disabled={title === 'View'}
                onChange={(e) => handlePostText(e.target.value)} />
              <span className="invalid">{error?.postText}</span>
            </Form.Group>
            {title === 'View' && <Form.Group controlId="formBasicEmail">
              <Form.Label>post date</Form.Label>
              <Form.Control type="text" placeholder="Enter post text"
                value={moment(singlePost.date).format('MMMM Do YYYY h:mm:ss a')}
                disabled={true} />
              <span className="invalid">{error?.postText}</span>
            </Form.Group>}

            {title !== 'View' &&
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            }

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleClose}>Save Changes </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateEditPost
