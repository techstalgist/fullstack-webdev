import React from 'react'
import {connect} from 'react-redux'
import {login, fieldChange} from '../reducers/loginReducer'
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'

class Login extends React.Component {

  handleChange = (e) => {
    this.props.fieldChange(e.target.name, e.target.value)
  }

  handleLogin = async(e) => {
    e.preventDefault()
    await this.props.login({
      username: this.props.username,
      password: this.props.password
    })
    this.props.history.push("/")
  }

  render() {
    const {username, password, user} = this.props
    if (user) { return null }
    return (
      <Grid>
        <Row>
          <Col md={12} xs={12}>
            <h2>Log in to application</h2>
          </Col>
        </Row>
        <Row>
          <Col md={7} xs={7}>
            <form onSubmit={this.handleLogin}>
              <FormGroup>
                <ControlLabel>username</ControlLabel>
                <FormControl type="text" name="username" value={username} onChange={this.handleChange}/>               
                <ControlLabel>password</ControlLabel>
                <FormControl type="password" name="password" value={password} onChange={this.handleChange}/>               
                <div className="mt-1">
                  <Button bsStyle="success" type="submit">log in</Button>                  
                </div>
              </FormGroup>
            </form>
          </Col>
        </Row>
    </Grid > 
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    password: state.login.password,
    user: state.login.user
  }
}

export default connect(
  mapStateToProps,
  {login, fieldChange}
)(Login)