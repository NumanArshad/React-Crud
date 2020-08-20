import React from "react"
import { Table, Button, Dropdown, Nav, Navbar, Form, FormControl } from 'react-bootstrap'
import {logout} from "../actions/authActions"
const Header=({history})=>{
    // const logout = () => {
    //     localStorage.clear()
    //     history.replace("login")
    // }
    return(
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" style={{ maxWidth: 30, maxHeight: 30 }}><img src={localStorage.getItem('avatar')} style={{ width: '100%' }} /></Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="#home">CRUD APPLICATION</Nav.Link>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Profiles</Nav.Link>
                <Nav.Link onClick={()=>history.push('/profiles/new')}>Create Profile</Nav.Link>
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