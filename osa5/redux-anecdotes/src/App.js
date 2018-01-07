import React from 'react';
import actionFor from './actionCreators'

class App extends React.Component {

  addVote = (id) => (e) => {
    this.props.store.dispatch(actionFor.voting(id))
  }

  addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.newAnecdote.value
    this.props.store.dispatch(actionFor.creating(content))
    e.target.newAnecdote.value = ''
  }

  render() {
    const byVotes = (a1, a2) => a2.votes - a1.votes
    const anecdotes = this.props.store.getState().sort(byVotes)
    const buttonStyle = {
      marginLeft: 5
    }
    const marginBottom = {
      marginBottom: 5
    }
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id} style={marginBottom}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes} votes
              <button style={buttonStyle} onClick={this.addVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="newAnecdote"/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App