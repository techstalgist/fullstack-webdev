import React from 'react'
import {voteAdding} from '../reducers/anecdoteReducer'
import {show, hide} from '../reducers/notificationReducer'
import {connect} from 'react-redux'
import Filter from './Filter'

class AnecdoteList extends React.Component {

  handleVoteAdd = (id) => (e) => {
    this.props.voteAdding(id)
    this.props.show('Added new vote')
    setTimeout(() => {
      this.props.hide()
    }, 5000)
  }

  render() {
    const {anecdotes, filter} = this.props
    const anecdotesToShow = () => {
      if (filter.length === 0) { return anecdotes }
      return anecdotes.filter(a => a.content.includes(filter))
    }
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
} 

export default connect(
  mapStateToProps,
  {voteAdding, show, hide}
)(AnecdoteList)
