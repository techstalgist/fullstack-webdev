import React from 'react'

const Notification = ({message, success}) => {
    if (message.length === 0) {
      return null
    }
    const cssClass = success ? 'success' : 'error'
    return (
      <div className={'message '+ cssClass}>{message}</div>
    )
}

export default Notification