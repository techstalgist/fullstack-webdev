import React from 'react'
import Login from './components/Login'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import blogService from './services/blogs'
import userService from './services/users'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      users: [],
      error: '',
      success: ''
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

  addCommentToBlog = (id, comment) => {
    const otherBlogs = this.state.blogs.filter(b => b._id !== id)
    const currentBlog = this.state.blogs.find(b => b._id === id)
    const updatedBlog = {
      ...currentBlog,
      comments: [...currentBlog.comments, comment]
    }
    this.setState({
      blogs: otherBlogs.concat(updatedBlog).sort(this.byLikes),
      success: `comment '${comment.content}' added to blog '${updatedBlog.title}'`
    })
    setTimeout(() => {
      this.setState({ success: '' })
    }, 4000)
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

  fetchUsers = () => {
    userService.getAll().then(users => {
      this.setState({users})
    })
  }

  fetchBlogs = () => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort(this.byLikes)
      this.setState({ blogs: sortedBlogs })
    })
  }

  componentWillMount() {
    this.fetchBlogs()
    this.fetchUsers()
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }

  render() {
    const userById = (id) => {
      return this.state.users.find(u => u._id === id)
    }
    const blogById = (id) => {
      return this.state.blogs.find(b => b._id === id)
    }
    const contents = () => (
      <div className='contents'>
          <Menu user={'foobar'} logout={this.logout}/>
          <Togglable buttonLabel="new blog">
            <NewBlog addBlog={this.addBlog}/>
          </Togglable>
          <Route exact path="/" render={() => <Blogs blogs={this.state.blogs}/>} />
          <Route exact path="/blogs/:id" render={({match}) =>
            <Blog blog={blogById(match.params.id)} fetchBlogs={this.fetchBlogs} loggedInUser={undefined} updateBlog={this.updateBlog} 
            deleteBlog={this.deleteBlog} addCommentToBlog={this.addCommentToBlog} />
          }/>
          <Route exact path="/users" render={() => <Users users={this.state.users}/>} />
          <Route exact path="/users/:id" render={({match}) => 
              <User user={userById(match.params.id)} fetchUsers={this.fetchUsers} />
          }/>
      </div>
    )
    return (
      <div>
        <h2>blogs</h2>
        <Router>
          <div>
            <Notification />
            {1 === 1 ? <Login /> : contents()}
          </div>
        </Router>
        
      </div>
    )
  }
}

export default App
