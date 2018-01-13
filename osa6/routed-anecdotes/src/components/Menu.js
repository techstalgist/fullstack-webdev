import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

const Menu = ({location}) => {

  return (
    <Navbar>
      <Nav>
        <NavItem componentClass={Link} href="/" to="/" active={location.pathname === '/'}>
          anecdotes
        </NavItem>
        <NavItem componentClass={Link} href="/create" to="/create" active={location.pathname === '/create'}>
          create new
        </NavItem>
        <NavItem componentClass={Link} href="/about" to="/about" active={location.pathname === '/about'}>
          about
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default withRouter(Menu)
