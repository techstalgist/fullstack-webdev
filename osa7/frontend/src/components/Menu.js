import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../reducers/loginReducer'
import {Navbar, Nav, NavItem, Button} from 'react-bootstrap'

const Menu = ({location, user, logout}) => {

  return (
    <Navbar>
        <Navbar.Collapse>
          <Nav>
            <NavItem componentClass={Link} href="/" to="/" active={location.pathname === '/'}>
              blogs
            </NavItem>
            <NavItem componentClass={Link} href="/users" to="/users" active={location.pathname === '/users'}>
              users
            </NavItem>
          </Nav>
           <Navbar.Text>
            <i>{user} logged in</i>
          </Navbar.Text>
          <Navbar.Form pullLeft>
            <Button onClick={logout}>logout</Button>
          </Navbar.Form>
        </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
    return {
      user: state.login.user.name
    }
  }
  
export default withRouter(
    connect(
      mapStateToProps,
      {logout}
    )(Menu)
)
