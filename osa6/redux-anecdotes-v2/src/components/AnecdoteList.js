import React from 'react'
import {voteAdding} from '../reducers/anecdoteReducer'
import {show, hide} from '../reducers/notificationReducer'
import {connect} from 'react-redux'
import Filter from './Filter'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {

  handleVoteAdd = (anecdote) => async (e) => {
    const anecdoteToUpdate = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const updatedAnecdote = await anecdoteService.update(anecdoteToUpdate)
    this.props.voteAdding(updatedAnecdote)
    this.props.show('Added new vote')
    setTimeout(() => {
      this.props.hide()
    }, 5000)
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
  {voteAdding, show, hide}
)(AnecdoteList)
