import React from 'react';
import actionFor from './actionCreators'

class App extends React.Component {

  addVote = (id) => (e) => {
    this.props.store.dispatch(actionFor.voting(id))
  }

  render() {
    const byId = (a1, a2) => a1.id - a2.id
    const anecdotes = this.props.store.getState().sort(byId)
    const buttonStyle = {
      marginLeft: 5
    }
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
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
        <form>
          <div><input /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App