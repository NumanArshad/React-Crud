import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import React from 'react'
import Login from './components/Login'
import SignUp from './components/Signup'
import Posts from './components/Posts/Posts'
import CreateEditProfile from './components/Profiles/CreateEditProfile'
import Header from "./common/header"
import NotFound from "./common/NotFound"
import Calculator from "./components/Calculator"
import createBrowserHistory from 'history/createBrowserHistory'

export const history = createBrowserHistory()

const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => {

        return (localStorage.getItem('token') ?
            <><Header {...props} />
                <Component {...props} /></>
            : <Redirect to="/login" />)

    }
    } />
}

const DynamicRoute = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/login" component={Login} exact />
                <Route path="/signup" component={SignUp} exact />
                <PrivateRoute path="/dashboard" exact component={Posts} />
                <Route path="/calc" exact component={Calculator} />
                <PrivateRoute path="/profiles/new" exact component={CreateEditProfile} />
                <Redirect from="/" to="/dashboard" />
                
                <Route path="*" component={NotFound} />
            </Switch>


        </Router>
    )
}
export default DynamicRoute