import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
    const renderComponent = (props) => {
      if (loggedIn) {
        return (
          <Component {...props} />
        )
      } else {
        return (
          <Redirect to="/login" />
        )
      }
    }
    return (
      <Route {...rest} render={renderComponent}/>
    )
}

export default PrivateRoute