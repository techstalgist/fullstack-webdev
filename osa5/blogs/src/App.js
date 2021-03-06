import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
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

    const contents = () => (
      <div className='contents'>
          <div className="row margin-bottom">
            <div className="column wide">{this.state.user.name} logged in</div>
            <div className="column"> <button onClick={this.logout}>logout</button></div>  
          </div>
          <Togglable buttonLabel="new blog">
            <NewBlog addBlog={this.addBlog}/>
          </Togglable>
          <div>
            <h3>existing blogs</h3>
            {this.state.blogs.map(blog => 
              <Blog updateBlog={this.updateBlog} deleteBlog={this.deleteBlog} loggedInUser={this.state.user} key={blog._id} blog={blog}/>
            )}
          </div>
      </div>
    )

    const showNotication = (msg, success) => (
      <Notification message={msg} success={success}/>
    )
    return (
      <div>
        <h2>blogs</h2>
        {this.state.success.length > 0 && showNotication(this.state.success, true)}
        {this.state.error.length > 0 && showNotication(this.state.error, false)}
        {this.state.user === null ? 
          <Login username={this.state.username} password={this.state.password} 
                 handleChange={this.handleLoginFieldChange} login={this.login}/> 
          : contents()}
      </div>
    )
  }
}

export default App
