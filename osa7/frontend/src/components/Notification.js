import React from 'react'
import {connect} from 'react-redux'

const Notification = ({message, success}) => {
    if (message.length === 0) {
      return null
    }
    const cssClass = success ? 'success' : 'error'
    return (
      <div className={'message '+ cssClass}>{message}</div>
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