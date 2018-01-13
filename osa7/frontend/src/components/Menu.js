import React from 'react'
import {NavLink} from 'react-router-dom'

const Menu = ({user, logout}) => {

  return (
    <div className="row margin-bottom bordered">
        <div className="column">
            <NavLink to={"/"}>blogs</NavLink>
        </div>
        <div className="column">
           <NavLink to={"/users"}>users</NavLink>
        </div>
        <div className="column">
            <i>{user} logged in</i>
        </div>
        <div className="column"> 
            <button onClick={logout}>logout</button>
        </div>  
    </div>
  )
}

export default Menu