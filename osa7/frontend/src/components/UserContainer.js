import React from 'react'
import {connect} from 'react-redux'
import User from './User'

const UserContainer = ({match, users}) => {
  const id = match.params.id
  const user = users.find(u => u._id === id)
  if (user === undefined) { return null }
  return (
    <User user={user} />
  )
}

const mapStateToProps = (state) => {
    return {
      users: state.users.users
    }
  }
  
export default connect(
    mapStateToProps,
    null
)(UserContainer)
