import React from 'react'
import {NavLink} from 'react-router-dom'

const Menu = () => {
  const background = {
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '15px',
    padding: '10px',
    marginTop: '10px',
    marginBottom: '10px',
    width:'40%',
    backgroundColor: '#6fe4ffd6'
  }
  const active = {
    backgroundColor: '#adb9e6'
  }
  return (
    <div style={background}>    
      <NavLink exact to="/" activeStyle={active}>anecdotes</NavLink>&nbsp;
      <NavLink exact to="/create" activeStyle={active}>create new</NavLink>&nbsp;
      <NavLink exact to="/about" activeStyle={active}>about</NavLink>&nbsp;
    </div>
  )
}

export default Menu
