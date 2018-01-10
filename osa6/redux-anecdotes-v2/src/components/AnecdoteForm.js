import React from 'react'
import {anecdoteCreation} from '../reducers/anecdoteReducer'
import {show, hide} from '../reducers/notificationReducer'
import {connect} from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.anecdoteCreation(content)
    this.props.show('Created new anecdote')
    e.target.anecdote.value = ''
    setTimeout(() => {
      this.props.hide()
    }, 5000)
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

export default connect(null, {anecdoteCreation, show, hide})(AnecdoteForm)
