import React from 'react'

const Notification = ({message}) => {

    const style = {
            color: 'white',
            fontSize: '20px',
            borderStyle: 'solid',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
            width:'40%',
            backgroundColor: 'red'
    }

    if (message.length === 0) {
      return null
    }
    return (
      <div style={style}>{message}</div>
    )
}

export default Notification