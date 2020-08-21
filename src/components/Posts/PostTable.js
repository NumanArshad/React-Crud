
import React, { useEffect, useState } from 'react'
import { Table, Dropdown } from 'react-bootstrap'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import ConfirmatioModal from './ConfirmationModal'
import LoaderSpinner from "../../common/Spinner"
import {Helmet} from "react-helmet"


const PostTable = ({ postsList, loading, getSinglePost, deletePost }) => {
    const [sliceData, setSlice] = useState([])
    const [paginateObject, setPaginate] = useState({ offset: 0, perPage: 5, pageCount: 0, currentPage: 0 })
    const [configSort, handleConfig] = useState({ key: '_id', direction: 'descending' })
    const [showmodal, handleShow] = useState(false)
    const [selectedPostId, handleSelected] = useState('')

    useEffect(() => {
        const totalPages = Math.ceil(postsList.length / paginateObject.perPage)
        setPaginate({ ...paginateObject, pageCount: totalPages })
        const sliceData = postsList.slice(paginateObject.offset, paginateObject.offset + paginateObject.perPage)
        setSlice(sliceData)
    }, [postsList])

    const handlePageClick = (e) => {
        const selectedOffset = e.selected * paginateObject.perPage
        const sliceData = postsList.slice(selectedOffset, selectedOffset + paginateObject.perPage)
        setSlice(sliceData)
        setPaginate({ ...paginateObject, offset: selectedOffset, currentPage: e.selected })
    }

    const requestSort = (key) => {
        let direction = "ascending"
        if (configSort.key === key && configSort.direction === direction) {
            direction = "descending"
        }
        handleSort(key, direction)
    }

    const handleSort = (key, direction) => {
        handleConfig({ key, direction })
        const updatedSort = postsList.sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === "ascending" ? -1 : 1
            }
            if (a[key] > b[key]) {
                return direction === "ascending" ? 1 : -1
            }
            return 0
        })
        const { offset, perPage } = paginateObject
        const sliceData = updatedSort.slice(offset, offset + perPage)
        setSlice(sliceData)
        //  setPaginate({ ...paginateObject, offset: selectedOffset, currentPage: e.selected })
    }

    const handleClose = (deleteConfirm) => {
        if (deleteConfirm) {
            deletePost(selectedPostId)
        }
        handleShow(false)
    }

    const triggerModal = (_id) => {
        handleSelected(_id)
        handleShow(true)
    }

    return (
        <React.Fragment>
             <Helmet>
          <title>Manage Posts | Crud App</title>
        </Helmet>
            <ConfirmatioModal show={showmodal} handleClose={handleClose} />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="header-cursor" onClick={() => requestSort('_id')}>id <i class="fa fa-sort"></i></th>
                        <th className="header-cursor" onClick={() => requestSort('text')}>text
                          <i class="fa fa-sort"></i>
                        </th>
                        <th className="header-cursor" onClick={() => requestSort('date')}>date
                           <i class="fa fa-sort"></i></th>
                        <th>user</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && <tr ><td colSpan="5" className="text-center"> ...loading</td></tr>}
                    {!loading && sliceData ?.map(({ _id, text, user, date }) => {
                        return (<tr>
                            <td>{_id}</td>
                            <td>{text}</td>
                            <td>{moment(date).format('MMMM Do YYYY h:mm:ss a')}</td>
                            <td>{user}</td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" disabled={localStorage.getItem('id') !== user}>Actions</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => getSinglePost(_id)}>Edit</Dropdown.Item>
                                        <Dropdown.Item onClick={() => triggerModal(_id)}>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>)
                    })}
                </tbody>
                <span>{loading && <LoaderSpinner />}</span>
            </Table>

            {!loading && <ReactPaginate
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
                activeClassName={"active"} />}
        </React.Fragment>
    )
}

export default PostTable