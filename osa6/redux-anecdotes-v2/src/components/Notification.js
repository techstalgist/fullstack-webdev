import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const { message } = this.props
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    if (message.length === 0) { return null }
    return (
      <div style={style}>
        {message}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)
