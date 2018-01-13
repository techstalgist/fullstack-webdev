import React from 'react'
import Login from './components/Login'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      users: [],
      username: '',
      password: '',
      error: '',
      success: ''
    }
  }

  login = async (e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({error: 'username or password incorrect'})
      setTimeout(() => {
        this.setState({error: ''})
      }, 4000)
    }
  }

  addBlog = (blog) => {
    this.setState({ 
      blogs: this.state.blogs.concat(blog).sort(this.byLikes),
      success: `a new blog ${blog.title} by ${blog.author} added`
    })
    setTimeout(() => {
      this.setState({ success: '' })
    }, 4000)
  }

  byLikes = (p1, p2) => p2.likes - p1.likes

  updateBlog = (blog) => {
    const otherBlogs = this.state.blogs.filter(b => b._id !== blog._id)
    const currentBlog = this.state.blogs.find(b => b._id === blog._id)
    const updatedBlog = {
      ...currentBlog,
      likes: currentBlog.likes + 1
    }
    this.setState({ 
      blogs: otherBlogs.concat(updatedBlog).sort(this.byLikes)
    })
  }

  deleteBlog = (id) => {
    const otherBlogs = this.state.blogs.filter(b => b._id !== id)
    this.setState({ 
      blogs: otherBlogs.sort(this.byLikes)
    })
  }

  logout = (e) => {
    this.setState({ username: '', password: '', user: null})
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
  }

  componentWillMount() {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort(this.byLikes)
      this.setState({ blogs: sortedBlogs })
    })
    userService.getAll().then(users => {
      this.setState({users})
    })
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      this.setState({user})
    }
  }

  handleLoginFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const userById = (id) => {
      return this.state.users.find(u => u._id === id)
    }
    const contents = () => (
      <div className='contents'>
          <div className="row margin-bottom">
            <div className="column wide">{this.state.user.name} logged in</div>
            <div className="column"> <button onClick={this.logout}>logout</button></div>  
          </div>
          <Togglable buttonLabel="new blog">
            <NewBlog addBlog={this.addBlog}/>
          </Togglable>
          <Route exact path="/" render={() => <Blogs blogs={this.state.blogs} user={this.state.user} updateBlog={this.updateBlog} deleteBlog={this.deleteBlog}/>} />
          <Route exact path="/users" render={() => <Users users={this.state.users}/>} />
          <Route exact path="/users/:id" render={({match}) => 
              <User user={userById(match.params.id)} />
          }/>
      </div>
    )

    const showNotication = (msg, success) => (
      <Notification message={msg} success={success}/>
    )
    return (
      <div>
        <h2>blogs</h2>
        <Router>
          <div>
            {this.state.success.length > 0 && showNotication(this.state.success, true)}
            {this.state.error.length > 0 && showNotication(this.state.error, false)}
            {this.state.user === null ? 
              <Login username={this.state.username} password={this.state.password} 
                  handleChange={this.handleLoginFieldChange} login={this.login}/> 
              : contents()}
          </div>
        </Router>
        
      </div>
    )
  }
}

export default App
