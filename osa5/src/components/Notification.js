import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({message, success}) => {
    if (message.length === 0) {
      return null
    }
    const cssClass = success ? 'success' : 'error'
    return (
      <div className={'message '+ cssClass}>{message}</div>
    )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired
}

export default Notification