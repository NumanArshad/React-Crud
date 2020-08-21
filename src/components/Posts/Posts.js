import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import CreateEditPost from './CreateEditPost'
import PostTable from './PostTable'
import { connect } from 'react-redux'
import { fetchAllPosts, createPost, getSinglePost, deletePost } from '../../actions/postactions'

const Posts = ({ fetchAllPosts, postsList, loading, createPost, getSinglePost, singlePost, deletePost }) => {
    const [isOpen, setTrigger] = useState(false)
  
    useEffect(() => {
        fetchAllPosts()
    }, [fetchAllPosts])

    const triggerModal = () => {
        setTrigger(isOpen ? false : true)
    }

    return (
        <div className="container">
            <div className="my-4">
                <Button variant="primary" onClick={triggerModal} disabled={loading}>
                    Create New Post
               </Button>
                <CreateEditPost show={isOpen} handleClose={triggerModal} singlePost={singlePost} createPost={createPost} title={Object.entries(singlePost).length > 0 ? "Edit Post" : "Create Post"} /></div>
            <PostTable postsList={postsList} loading={loading} getSinglePost={getSinglePost} deletePost={deletePost} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    postsList: state.postReducer.posts,
    loading: state.loadingReducer.loading,
    singlePost: state.postReducer.single_post
})

export default connect(mapStateToProps, { fetchAllPosts, createPost, getSinglePost, deletePost })(Posts)