import React from "react"
import { Link } from "react-router-dom"
const NotFound = () => {
    return (
        <div className="mt-4 text-center"><h5 className="invalid">oops  Page not found</h5>
            <Link to={`/dashboard`} >Back</Link>
        </div>
    )
}
export default NotFound