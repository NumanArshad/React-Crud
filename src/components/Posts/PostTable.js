

import React, { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import moment from 'moment'
import LoaderSpinner from "../../common/Spinner"
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import DataTable from 'react-data-table-component';
const PostTable = ({ postsList, loading, getSinglePost, deletePost }) => {


  // const columns = [
  //   {
  //     name: 'Id',
  //     selector: 'Id',
  //     sortable: true,
  //     //cell: row => <div><div style={{ fontWeight: 'bold' }}>{row.title}</div>{row.summary}</div>,
  //   },
  //   {
  //     name: 'email',
  //     selector: 'email',
  //     sortable: true,

  //   },
  //   {
  //     name: 'first_name',
  //     selector: 'first_name',
  //     sortable: true,
  //     cell: row =>
  //       <span>{moment(row.date).format('MMMM Do YYYY h:mm:ss a')}</span>
  //   },
  //   {
  //     name: 'last_name',
  //     selector: 'last_name',
  //     sortable: true,
  //     cell: row =>
  //       (<Dropdown>
  //         <Dropdown.Toggle id="dropdown-basic">Actions</Dropdown.Toggle>
  //         <Dropdown.Menu>
  //           <Dropdown.Item onClick={() => getSinglePost(row._id)}>View</Dropdown.Item>
  //           <Dropdown.Item onClick={() => deletePost(row._id)} disabled={row.user !== localStorage.getItem('id')}>Delete</Dropdown.Item>
  //         </Dropdown.Menu>
  //       </Dropdown>)

  //   },
  // ];

  const columns = [
    {
      name: 'Id',
      selector: '_id',
      sortable: true,
      //cell: row => <div><div style={{ fontWeight: 'bold' }}>{row.title}</div>{row.summary}</div>,
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
            <Dropdown.Item onClick={() => deletePost(row._id)} disabled={row.user !== localStorage.getItem('id')}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>)

    },
  ];

  const sortIcon = <ArrowDownward />;

  useEffect(() => {

    let rows = document.getElementsByClassName("sc-fzoLsD")
    for (let row of rows) {
      row.draggable = true
    }
    document.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData('dragElement', `${event.target.id} ${event.clientY}`)
    })
    document.addEventListener("drag", function (event) {
      console.log("being dragged")
    })
    document.addEventListener("dragover", function (event) {
      event.preventDefault()
      console.log(event.target.parentElement)
    })
    document.addEventListener("drop", function (event) {
      const [dragId, Y] = event.dataTransfer.getData('dragElement').split(' ')
      const sourceElement = document.getElementById(dragId)
      const targetElement = event.target.parentNode

      if (!sourceElement || !targetElement) return;

      if (targetElement.parentElement == sourceElement.parentElement) {
        if (+Y < event.clientY) {
          targetElement.parentElement.insertBefore(sourceElement, targetElement.nextSibling)
        }
        else {
          targetElement.parentElement.insertBefore(sourceElement, targetElement)
        }

      }
    }, [postsList])


  })


  // const options = {
  //   filter: true,
  //   filterType: 'dropdown',
  //   //responsive: this.state.vertical ? 'vertical' : 'standard',
  //  fixedHeader: false,
  //   // fixedSelectColumn: false,
  //   rowHover: true,

  //   //selectableRows: "none",
  //   // draggableColumns: {
  //   //   enabled: true
  //   // },
  //   textLabels: {
  //     body: {
  //       noMatch: "Sorry, no matching records found",
  //       toolTip: "Sort",
  //       columnHeaderTooltip: column => `Sort for ${column.label}`
  //     },
  //     pagination: {
  //       next: "Next Page",
  //       previous: "Previous Page",
  //       rowsPerPage: "Rows per page:",
  //       displayRows: "of",
  //     },
  //     toolbar: {
  //       search: "Search",
  //       downloadCsv: "Download CSV",
  //       print: "Print",
  //       viewColumns: "View Columns",
  //       filterTable: "Filter Table",
  //     },
  //     filter: {
  //       all: "All",
  //       title: "FILTERS",
  //       reset: "RESET",
  //     },
  //     viewColumns: {
  //       title: "Show Columns",
  //       titleAria: "Show/Hide Table Columns",
  //     },

  //   },
  //   setRowProps: (row, dataIndex, rowIndex) => {
  //     return {
  //       // className: clsx({
  //       //   [this.props.classes.BusinessAnalystRow]: row[1] === 'Business Analyst',
  //       //   [this.props.classes.GreyLine]: rowIndex % 2 === 0 && row[1] !== 'Business Analyst',
  //       // }),
  //       style: { cursor: 'pointer' },
  //     };
  //   },

  // };



  return (
    <>
      {/* <Draggable/> */}
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