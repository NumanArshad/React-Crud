import React, { useEffect, useState } from 'react'
import { Table, Button,Dropdown } from 'react-bootstrap'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import CreateEditProfile from './CreateEditProfile'
import {connect} from 'react-redux'
import {fetchAllPosts} from '../../actions/profileactions'
import './paginate.css'
const Profile = (props) => {
    const [data, setData] = useState([])
    const [sliceData, setSlice] = useState([])

    const [loading, setLoading] = useState(true)
    const [isOpen, setTrigger] = useState(false)
    const [paginateObject, setPaginate] = useState({ offset: 0, perPage: 2, pageCount: 0, currentPage: 0 })
    useEffect(() => {

        fetchResponse()
        //props.fetchAllPosts()
        
    }, [])

    const fetchResponse = async () => {
        //  alert("fetch called")
        const resp = await axios.get('http://3d56c63146f8.ngrok.io/api/v1/posts')
        setData(resp.data)

        const totalPages = Math.ceil(resp.data.length / paginateObject.perPage)
        setPaginate({ ...paginateObject, pageCount: totalPages })

        const sliceData = resp.data.slice(paginateObject.offset, paginateObject.perPage)
        setSlice(sliceData)

        setLoading(false)
    }

    const triggerModal = () => {
        setTrigger(isOpen ? false : true)
    }

    const handlePageClick = (e) => {
        const selectedOffset = e.selected * paginateObject.perPage
        const sliceData = data.slice(selectedOffset, selectedOffset + paginateObject.perPage)
        setSlice(sliceData)
        setPaginate({ ...paginateObject, offset: selectedOffset, currentPage: e.selected })
    }

    return (
        <React.Fragment>
            <div className="my-2">
                <Button variant="primary" onClick={triggerModal} disabled={loading}>
                    Launch demo modal
               </Button>
                <CreateEditProfile show={isOpen} handleClose={triggerModal} fetchResponse={fetchResponse} /></div>

            <Table striped bordered hover>
                <thead>

                    {/* <tr>
                        <th>id</th>
<th>AlbumId</th>
                        <th>title</th>
                        <th>thumnailUrl</th>
                    </tr> */}
                    <tr>
                        <th>id</th>
                        <th>text</th>
                        <th>user</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && <tr ><td colSpan="4" className="text-center"> ...loading</td></tr>}
                    {!loading && sliceData.map(({ _id, text, user }) => {
                        return (<tr>
                            <td>{_id}</td>
                            <td>{text}</td>
                            <td>{user}</td>

                            <td>
                                <Dropdown>
                                <Dropdown.Toggle  id="dropdown-basic">
                                    <img src="/more.png" style={{maxWidth:20,maxHeight:20}}  />
                                  </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>alert("action selected")}>Edit</Dropdown.Item>
                                    <Dropdown.Item >Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            
                            </td>
                        </tr>)
                    })}
                    {/* {!loading && sliceData.map(({ albumId, title, id, thumbnailUrl }) => {
                        return (<tr>
                            <td>{id}</td>
                            <td>{albumId}</td>
                            <td>{title}</td>
                            <td><img src={thumbnailUrl} style={{ maxWidth: 50, maxHeight: 50 }} /></td>
                        </tr>)
                    })} */}


                </tbody>
            </Table>

            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={paginateObject.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
        </React.Fragment>
    )
}
export default connect(null,{fetchAllPosts})(Profile)