import React from 'react'
import {connect} from 'react-redux'
import Login from './Login'
import FixedContents from './FixedContents'
import Notification from './Notification'
import blogService from '../services/blogs'
import {fetchBlogs} from '../reducers/blogsReducer'
import {fetchUsers} from '../reducers/usersReducer'
import {loginAction} from '../reducers/loginReducer'
import { Router, Route } from 'react-router-dom'
import Blogs from './Blogs'
import Users from './Users'
import UserContainer from './UserContainer'
import BlogContainer from './BlogContainer'
import PrivateRoute from './PrivateRoute'
import history from '../history'

class Routes extends React.Component {

  componentWillMount = async () => {
    await this.props.fetchBlogs()
    await this.props.fetchUsers()
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      this.props.loginAction(user)
      history.push("/")
    }
  }

  render() {
    const {loggedIn} = this.props
    return (
        <Router history={history}>
            <div>
                <Notification />
                <FixedContents loggedIn={loggedIn} />
                <Route path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Blogs} loggedIn={loggedIn}/>
                <PrivateRoute path="/blogs/:id" component={BlogContainer} loggedIn={loggedIn}/>
                <PrivateRoute exact path="/users" component={Users} loggedIn={loggedIn} />
                <PrivateRoute path="/users/:id" component={UserContainer} loggedIn={loggedIn}/>
            </div>
        </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.user !== null
  }
}

export default connect(mapStateToProps, {fetchBlogs, fetchUsers, loginAction})(Routes)