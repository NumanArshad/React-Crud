import React, { useEffect, useState, useMemo } from 'react'
import { Table, Button, Dropdown, Nav, Navbar, Form, FormControl } from 'react-bootstrap'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import CreateEditProfile from './CreateEditProfile'
import PostTable from './PostTable'
import { connect } from 'react-redux'
import { fetchAllPosts, createPost, getSinglePost, deletePost } from '../../actions/profileactions'
const Profile = ({ fetchAllPosts, postsList, loading, createPost, getSinglePost, singlePost, deletePost }) => {
    const [isOpen, setTrigger] = useState(false)

    useEffect(() => {
        fetchAllPosts()
    }, [])

    const triggerModal = () => {
        setTrigger(isOpen ? false : true)
    }



    return (
        <React.Fragment>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    {/* <Button variant="outline-info">Search</Button> */}
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            Actions
                                    {/* <img src="/more.png" style={{maxWidth:20,maxHeight:20}}  /> */}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => alert("called")}>Logouy</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Navbar>


            <div className="my-2">
                <Button variant="primary" onClick={triggerModal} disabled={loading}>
                    Create New Post
               </Button>
                <CreateEditProfile show={isOpen} handleClose={triggerModal} singlePost={singlePost} createPost={createPost} /></div>
            <PostTable postsList={postsList} loading={loading} getSinglePost={getSinglePost} deletePost={deletePost} />
        </React.Fragment>
    )
}
const mapStateToProps = (state) => ({
    postsList: state.profileReducer.posts,
    loading: state.loadingReducer.loading,
    singlePost: state.profileReducer.single_post


})
export default connect(mapStateToProps, { fetchAllPosts, createPost, getSinglePost, deletePost })(Profile)