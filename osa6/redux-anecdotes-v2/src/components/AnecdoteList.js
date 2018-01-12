import React from 'react'
import {addVote} from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'
import {connect} from 'react-redux'
import Filter from './Filter'

class AnecdoteList extends React.Component {

  handleVoteAdd = (anecdote) => async (e) => {
    const anecdoteToUpdate = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    this.props.addVote(anecdoteToUpdate)
    this.props.notify('Added new vote', 5)
  }

  render() {    
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleVoteAdd(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  let arr;
  if (filter.length === 0) { 
    arr = anecdotes
  } else {
    arr = anecdotes.filter(a => a.content.includes(filter))
  }
  return arr.sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
} 

export default connect(
  mapStateToProps,
  {addVote, notify}
)(AnecdoteList)
