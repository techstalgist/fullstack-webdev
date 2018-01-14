import React from 'react'
import {connect} from 'react-redux'
import Login from './components/Login'
import Contents from './components/Contents'
import Notification from './components/Notification'
import blogService from './services/blogs'
import userService from './services/users'
import {fetchBlogs} from './reducers/blogsReducer'
import {loginAction} from './reducers/loginReducer'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import BlogContainer from './components/BlogContainer'

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  const renderComponent = (props) => {
    if (loggedIn) {
      return (
        <Component {...props} />
      )
    } else {
      return (
        <Redirect to="/login" />
      )
    }
  }
  return (
    <Route {...rest} render={renderComponent}/>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  fetchUsers = () => {
    userService.getAll().then(users => {
      this.setState({users})
    })
  }
  componentWillMount = async () => {
    await this.props.fetchBlogs()
    await this.fetchUsers()
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      this.props.loginAction(user)
    }
  }

  render() {
    const {loggedIn} = this.props
    const userById = (users, id) => {
      return users.find(u => u._id === id)
    }
    return (
      <div>
        <h2>blogs</h2>
        <Router>
          <div>
            <Notification />
            <Contents loggedIn={loggedIn} />
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Blogs} loggedIn={loggedIn}/>
            <PrivateRoute path="/blogs/:id" component={BlogContainer} loggedIn={loggedIn}/>
            <Route exact path="/users" render={() => <Users users={this.state.users}/>} />
            <Route exact path="/users/:id" render={({match}) => 
                <User user={userById(this.state.users, match.params.id)} fetchUsers={this.fetchUsers} />
            }/>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.login.user !== null
  }
}

export default connect(mapStateToProps, {fetchBlogs, loginAction})(App)