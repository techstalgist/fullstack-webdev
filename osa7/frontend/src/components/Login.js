import React from 'react'
import {connect} from 'react-redux'
import {login, fieldChange} from '../reducers/loginReducer'

class Login extends React.Component {

  handleChange = (e) => {
    this.props.fieldChange(e.target.name, e.target.value)
  }

  handleLogin = (e) => {
    e.preventDefault()
    this.props.login({
      username: this.props.username,
      password: this.props.password
    })
  }

  render() {
    const {username, password} = this.props
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={this.handleLogin}>
          <div className="row">
            <div className="column left">username</div>
            <div className="column right"> 
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="column left">password</div>
            <div className="column right"> 
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button>log in</button>
        </form>
    </div > 
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    password: state.login.password
  }
}

export default connect(
  mapStateToProps,
  {login, fieldChange}
)(Login)