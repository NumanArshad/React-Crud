

import React, { useEffect, useState, forwardRef } from 'react'
import { Table, Dropdown } from 'react-bootstrap'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import ConfirmatioModal from './ConfirmationModal'
import LoaderSpinner from "../../common/Spinner"
import { Helmet } from "react-helmet"
import MUIDataTable from "mui-datatables";

const PostTable = ({ postsList, loading, getSinglePost, deletePost }) => {
  const columns = [
    {
      name: "_id",
      label: "Id",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "text",
      label: "Text",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <span>{moment(value).format('MMMM Do YYYY h:mm:ss a')}</span>)

      }
    },
    {
      name: "user",
      label: "User",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "actions",
      label: "Action",
      options: {
        customBodyRender: (value, { rowData: [first, ...rest] }, updateValue) => (
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">Actions</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => getSinglePost(first)}>View</Dropdown.Item>
              <Dropdown.Item onClick={() => deletePost(first)} disabled={rest[2] !== localStorage.getItem('id')}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>)

      }
    },
  ];

  const options = {
    filter: true,
    filterType: 'dropdown',
    //responsive: this.state.vertical ? 'vertical' : 'standard',
    // fixedHeader: false,
    // fixedSelectColumn: false,
    rowHover: true,
    selectableRows: "none",
    // draggableColumns: {
    //   enabled: true
    // },
    textLabels: {
      body: {
        noMatch: "Sorry, no matching records found",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of",
      },
      toolbar: {
        search: "Search",
        downloadCsv: "Download CSV",
        print: "Print",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      filter: {
        all: "All",
        title: "FILTERS",
        reset: "RESET",
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },

    },

  };



  return (
    <>
      <span>{loading && <LoaderSpinner />}</span>
      <MUIDataTable
        columns={columns}
        data={postsList}
        options={options}
      /></>
  );

}

export default PostTable