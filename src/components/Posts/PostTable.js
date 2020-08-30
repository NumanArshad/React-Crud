

import React, { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import moment from 'moment'
import LoaderSpinner from "../../common/Spinner"
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import DataTable from 'react-data-table-component';
const PostTable = ({ postsList, loading, getSinglePost, deletePost }) => {

  const columns = [
    {
      name: 'Id',
      selector: '_id',
      sortable: true
    },
    {
      name: 'Text',
      selector: 'text',
      sortable: true,

    },
    {
      name: 'date',
      selector: 'Date',
      sortable: true,
      cell: row =>
        <span>{moment(row.date).format('MMMM Do YYYY h:mm:ss a')}</span>
    },
    {
      name: 'User',
      selector: 'user',
      sortable: true,
      cell: row =>
        (<Dropdown>
          <Dropdown.Toggle id="dropdown-basic">Actions</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => getSinglePost(row._id)}>View</Dropdown.Item>
            <Dropdown.Item onClick={() => deletePost(row._id)}
              disabled={row.user !== localStorage.getItem('id')}
            >Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>)

    },
  ];

  const sortIcon = <ArrowDownward />;

  useEffect(() => {
    document.title = "Posts | Crud App"
    let rows = document.getElementsByClassName("sc-fzoLsD")
    for (let row of rows) {
      row.draggable = true
    }
    document.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData('dragElement', `${event.target.id} ${event.clientY}`)
    })

    document.addEventListener("dragover", (event) => event.preventDefault())

    document.addEventListener("drop", (event) => {
      const [dragId, Y] = event.dataTransfer.getData('dragElement').split(' ')
      const sourceElement = document.getElementById(dragId)
      const targetElement = event.target.parentNode
      if (!sourceElement || !targetElement) return;
      if (targetElement.parentElement !== sourceElement.parentElement) return;
      if (+Y < event.clientY) {
        targetElement.parentElement.insertBefore(sourceElement, targetElement.nextSibling)
        return
      }
      targetElement.parentElement.insertBefore(sourceElement, targetElement)
    }, [postsList])
  })

  return (
    <>
      <span>{loading && <LoaderSpinner />}</span>
      <DataTable
        striped={true}
        columns={columns}
        pagination
        sortIcon={sortIcon}
        data={postsList}
      />
    </>
  );

}

export default PostTable