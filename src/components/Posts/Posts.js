import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import CreateEditPost from './CreateEditPost'
import PostTable from './PostTable'
import { connect } from 'react-redux'
import { fetchAllPosts, createPost, getSinglePost, deletePost } from '../../actions/postactions'

const Posts = ({ fetchAllPosts, postsList, loading, createPost, getSinglePost, singlePost, deletePost }) => {
    const [isOpen, setTrigger] = useState(false)
    const [title, setTitle] = useState('')
    useEffect(() => {
        fetchAllPosts()
    }, [fetchAllPosts])

    useEffect(() => {
        if (Object.entries(singlePost).length > 0) {
            setTitle('View')
            setTrigger(true)
        }
    }, [singlePost])

    const triggerModal = () => {
        setTrigger(isOpen ? false : true)
    }

    const triggerCreate = () => {
        setTitle('Create')
        triggerModal()
    }

    return (
        <div className="container">
            <div className="my-4"></div>
            <Button variant="primary" className="mt-4" onClick={triggerCreate}>
                Create New Post
               </Button>
            <PostTable postsList={postsList} loading={loading} getSinglePost={getSinglePost} deletePost={deletePost} />
            <CreateEditPost show={isOpen} handleClose={triggerModal} singlePost={singlePost} createPost={createPost} title={title} />

        </div>
    )
}

const mapStateToProps = (state) => ({
    postsList: state.postReducer.posts,
    loading: state.loadingReducer.loading,
    singlePost: state.postReducer.single_post
})

export default connect(mapStateToProps, { fetchAllPosts, createPost, getSinglePost, deletePost })(Posts)