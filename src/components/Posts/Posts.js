import React, { useEffect, useState, useMemo } from 'react'
import { Table, Button, Dropdown, Nav, Navbar, Form, FormControl } from 'react-bootstrap'
import axios from 'axios'

import CreateEditPost from './CreateEditPost'
import PostTable from './PostTable'
import { connect } from 'react-redux'
import { fetchAllPosts, createPost, getSinglePost, deletePost } from '../../actions/postactions'


const Posts = ({ fetchAllPosts, postsList, loading, createPost, getSinglePost, singlePost, deletePost, history }) => {
    const [isOpen, setTrigger] = useState(false)

    useEffect(() => {
        fetchAllPosts()
    }, [])

    const triggerModal = () => {
        setTrigger(isOpen ? false : true)
    }



    return (
        <React.Fragment>
           
            {/* <Navbar bg="dark" variant="dark">
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
               
            </Navbar> */}


            <div className="my-2">
                <Button variant="primary" onClick={triggerModal} disabled={loading}>
                    Create New Post
               </Button>
                <CreateEditPost show={isOpen} handleClose={triggerModal} singlePost={singlePost} createPost={createPost} title={Object.entries(singlePost).length > 0 ? "Edit Post" : "Create Post"} /></div>
            <PostTable postsList={postsList} loading={loading} getSinglePost={getSinglePost} deletePost={deletePost} />
        </React.Fragment>
    )
}
const mapStateToProps = (state) => ({
    postsList: state.postReducer.posts,
    loading: state.loadingReducer.loading,
    singlePost: state.postReducer.single_post


})
export default connect(mapStateToProps, { fetchAllPosts, createPost, getSinglePost, deletePost })(Posts)