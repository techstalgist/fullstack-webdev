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
    const anecdotesToShow = () => {
      const anecdotes = this.props.store.getState().anecdotes
      const filter = this.props.store.getState().filter
      if (filter.length === 0) { return anecdotes }
      return anecdotes.filter(a => a.content.includes(filter))
    }
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotesToShow().sort((a, b) => b.votes - a.votes).map(anecdote =>
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
