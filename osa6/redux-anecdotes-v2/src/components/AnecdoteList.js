import React from 'react'
import {voteAdding} from '../reducers/anecdoteReducer'
import {show, hide} from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {

  handleVoteAdd = (id) => (e) => {
    this.props.store.dispatch(voteAdding(id))
    this.props.store.dispatch(show('Added new vote'))
    setTimeout(() => {
      this.props.store.dispatch(hide())
    }, 5000)
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleVoteAdd(anecdote.id)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
