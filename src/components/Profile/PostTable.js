
import React, { useEffect, useState, useMemo } from 'react'
import { Table, Button,Dropdown } from 'react-bootstrap'
import moment from 'moment'
import ReactPaginate from 'react-paginate'


import './paginate.css'
const PostTable = ({postsList,loading,getSinglePost,deletePost}) => {
    const [sliceData, setSlice] = useState([])
    const [paginateObject, setPaginate] = useState({ offset: 0, perPage: 5, pageCount: 0, currentPage: 0 })
    const [configSort,handleConfig]=useState({key:'_id',direction:'ascending'})

    useEffect( () => {
       // alert(JSON.stringify(postsList))
         const totalPages = Math.ceil(postsList.length / paginateObject.perPage)
         setPaginate({ ...paginateObject, pageCount: totalPages })
         const sliceData = postsList.slice(paginateObject.offset, paginateObject.perPage)
         setSlice(sliceData)
    }, [postsList])

   const handlePageClick = (e) => {
        const selectedOffset = e.selected * paginateObject.perPage
        const sliceData = postsList.slice(selectedOffset, selectedOffset + paginateObject.perPage)
        setSlice(sliceData)
        setPaginate({ ...paginateObject, offset: selectedOffset, currentPage: e.selected })
    }

    const requestSort=(key)=>{
        let direction="ascending"
        alert(configSort.direction)
        if(configSort.key==key && configSort.direction==direction){
           // alert(configSort.direction==direction)
         direction="descending"
        }
        handleSort(key,direction)
    }

    const handleSort=(key,direction)=>{
       
        handleConfig({key,direction})
        const updated=sliceData.sort((a,b)=>{
            if(a[key]<b[key]){
                return direction=="ascending"?-1:1
            }
            if(a[key]>b[key]){
                return direction=="ascending"?1:-1
            }
            return 0
        })
        setSlice(updated)

    }


    return (
        <React.Fragment>
           
            <Table striped bordered hover>
                <thead>

                    <tr>
                        <th className="header-cursor"  onClick={()=>requestSort('_id')}>id <i class="fa fa-angle-up" style={{display:configSort.key=="_id" ? "visible":"none"}}></i></th>
                        <th className="header-cursor" onClick={()=>requestSort('text')}>text <i class="fa fa-angle-up" style={{display:configSort.key==='text' ? "visible":"none"}}></i></th>
                        <th className="header-cursor" onClick={()=>requestSort('date')}>date <i class="fa fa-angle-up" style={{display:configSort.key=="date" ? "visible":"none"}}></i></th>
                        <th>user</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && <tr ><td colSpan="5" className="text-center"> ...loading</td></tr>}
                    {!loading && sliceData.map(({ _id, text, user,date }) => {
                        return (<tr>
                            <td>{_id}</td>
                            <td>{text}</td>
                            <td>{moment(date).format('MMMM Do YYYY h:mm:ss a')}</td>
                            <td>{user}</td>

                            <td>
                                <Dropdown>
                                <Dropdown.Toggle  id="dropdown-basic">
                                Actions
                                    {/* <img src="/more.png" style={{maxWidth:20,maxHeight:20}}  /> */}
                                  </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>getSinglePost(_id)}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>deletePost(_id)}>Delete</Dropdown.Item>
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
// const mapStateToProps=(state)=>({
//      postsList:state.profileReducer.posts,
//      loading:state.loadingReducer.loading

    
// })
export default PostTable