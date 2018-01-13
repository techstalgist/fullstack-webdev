import React from 'react'

const Notification = ({message}) => {

    const style = {
            color: 'green',
            fontSize: '20px',
            borderStyle: 'solid',
            borderRadius: '15px',
            padding: '10px',
            marginTop: '10px',
            marginBottom: '10px',
            width:'40%',
            backgroundColor: 'white'
    }

    if (message.length === 0) {
      return null
    }
    return (
      <div style={style}>{message}</div>
    )
}

export default Notification