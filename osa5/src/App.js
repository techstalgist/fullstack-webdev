import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: ''
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
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      console.log(exception)
    }
  }

  logout = (e) => {
    this.setState({ username: '', password: '', user: null})
    window.localStorage.removeItem('loggedUser')
  }

  componentWillMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
    }
  }

  handleLoginFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {

    const blogs = () => (
      <div>
          <h2>blogs</h2>
          <div><span className="rightmargin">{this.state.user.name} logged in</span> 
            <button onClick={this.logout}>logout</button>
          </div>
          {this.state.blogs.map(blog => 
            <Blog key={blog._id} blog={blog}/>
          )}
      </div>
    )
    return (
      <div>
        {this.state.user === null ? 
          <Login username={this.state.username} password={this.state.password} 
                 handleChange={this.handleLoginFieldChange} login={this.login}/> 
          : blogs()}
      </div>
    )
  }
}

export default App;
