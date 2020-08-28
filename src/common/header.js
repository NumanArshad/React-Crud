import React from "react"
import { Dropdown, Nav, Navbar } from 'react-bootstrap'
import { logout } from "../actions/authActions"


const Header = ({ history }) => {

  return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home" style={{ maxWidth: 30, maxHeight: 30 }}><img src={localStorage.getItem('avatar')} style={{ width: '100%' }} alt="profileImg" /></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">CRUD APPLICATION</Nav.Link>
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => history.push('/dashboard')}>Posts</Nav.Link>
                    <Nav.Link onClick={() => history.push('/profiles/new')}>Manage Profile</Nav.Link>
                    <Nav.Link onClick={() => history.push('/calc')}>Calculator</Nav.Link>
                    <Nav.Link onClick={() => history.push('/webcam')}>Webcame</Nav.Link>

                </Nav>
            </Nav>
         
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    {localStorage.getItem('name')}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Navbar>
    )

}
export default Header