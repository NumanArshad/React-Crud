import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import React from 'react'
import Login from './components/Login'
import SignUp from './components/Signup'
import Profile from './components/Profile/Profiles'

localStorage.setItem('name','numan')
const PrivateRoute=({component:Component,...rest})=>{
    return <Route {...rest} render={(props)=>{
        return( localStorage.getItem('name')?<Component {...props}/>:<Redirect to="/login" />)
       
    }
         
    } />
}

const DynamicRoute=()=>{
    return(
<Router>
    <Route  path="/login" component={Login} exact />
    <Route  path="/signup" component={SignUp} exact />
    <PrivateRoute path="/dashboard/:page?" exact component={Profile}/>

</Router>
    )
}
export default DynamicRoute