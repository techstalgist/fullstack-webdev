import React from 'react'
import {connect} from 'react-redux'
import {Alert} from 'react-bootstrap'

const Notification = ({message, success}) => {
    if (message.length === 0) {
      return null
    }
    const cssClass = success ? 'success' : 'danger'
    return (
      <Alert bsStyle={cssClass}>{message}</Alert>
    )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    success: state.notification.success
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)