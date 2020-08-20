import React,{useState} from 'react'
import {Modal,Button} from 'react-bootstrap'
const ConfirmatioModal=({show,handleClose})=> {
   // const [show, setShow] = useState(false);
  
    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
  
    return (
      <>
        {/* <Button variant="primary" //onClick={handleShow}
        >
          Launch demo modal
        </Button> */}
  
        <Modal show={show} onHide={()=>handleClose(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure! you want to delete post?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={()=>handleClose(true)}
            >
              OK
            </Button>
            <Button variant="danger" onClick={()=>handleClose(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default ConfirmatioModal
  