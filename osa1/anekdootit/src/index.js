import React from 'react'
import ReactDOM from 'react-dom'

const Anecdote = (props) => {
    const {anecdote} = props;
    return (
        <div>
            <p>{anecdote.name}</p>
            <p>has {anecdote.votes} votes</p>
        </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      anecdotes: [
        {name: 'If it hurts, do it more often', votes: 0},
        {name: 'Adding manpower to a late software project makes it later!', votes: 0},
        {name: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
        {name:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
        {name:'Premature optimization is the root of all evil.', votes: 0},
        {name:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0}
      ]
    }
  }

  getRndInteger = (min, max) => Math.floor(Math.random() * (max - min)) + min

  choose = (max) => () => {
    const selection = this.getRndInteger(0, max);
    this.setState({ 
        selected: selection
    })
  }

  vote = () => {
    const selected = this.state.selected
    const curr = this.state.anecdotes[selected]
    const updatedAnecdote = {
        ...curr,
        votes: curr.votes + 1
    }
    const updatedAnecdotes = [
        ...this.state.anecdotes.slice(0, selected),
        updatedAnecdote,
        ...this.state.anecdotes.slice(selected+1, this.state.anecdotes.length)
    ]
    this.setState({
        anecdotes: updatedAnecdotes
    })
  }

  getMostVoted = (anecdotes) => {
      let mostVoted = anecdotes[0];
      anecdotes.forEach(a => {
        if (a.votes > mostVoted.votes) {
            mostVoted = a;
        }
      })
      return mostVoted
  }

  render() {
    
    return (
      <div>
        <Anecdote anecdote={this.state.anecdotes[this.state.selected]} />
        <button onClick={this.vote}>vote</button>
        <button onClick={this.choose(this.state.anecdotes.length)}>next anecdote</button>
        <h2>Anecdote with most votes: </h2>
        <Anecdote anecdote={this.getMostVoted(this.state.anecdotes)}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)