import React, { useState, useContext, useEffect } from "react"
import { Dropdown, Nav, Navbar } from 'react-bootstrap'
import { logout } from "../actions/authActions"
import context  from "../context/themeContext"
import AppTheme  from "../context/apptheme"

const Header = ({ history }) => {
    const [theme,setTheme]=useContext(context)
//     const {backgroundColor,textColor}=AppTheme[theme]
//  useEffect(()=>{
// document.body.style.backgroundColor=backgroundColor
// document.body.style.color=textColor
//  },[theme])

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home" style={{ maxWidth: 30, maxHeight: 30 }}><img src={localStorage.getItem('avatar')} style={{ width: '100%' }} alt="profileImg" /></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">CRUD APPLICATION</Nav.Link>
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => history.push('/dashboard')}>Posts</Nav.Link>
                    <Nav.Link onClick={() => history.push('/profiles/new')}>Manage Profile</Nav.Link>
                </Nav>
            </Nav>
            <Dropdown className="mr-2">
                <Dropdown.Toggle id="dropdown-basic">
                 Change Language
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTheme(theme=="light"?"dark":"light")}>EN</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTheme(theme=="light"?"dark":"light")}>CHN</Dropdown.Item>

                </Dropdown.Menu>
               
              
            </Dropdown>
            <Dropdown className="mr-2">
                <Dropdown.Toggle id="dropdown-basic">
                 Switch Theme
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTheme(theme=="light"?"dark":"light")}>{theme=="light"?"dark":"light"}</Dropdown.Item>
                </Dropdown.Menu>
              
            </Dropdown>
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