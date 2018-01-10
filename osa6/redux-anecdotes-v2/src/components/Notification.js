import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const msg = this.props.store.getState().notification
    if (msg.length === 0) { return null }
    return (
      <div style={style}>
        {this.props.store.getState().notification}
      </div>
    )
  }
}

export default Notification
