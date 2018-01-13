import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import About from './components/About'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: 1
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: 2
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = Number((Math.random() * 10000).toFixed(0))
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `A new anecdote '${anecdote.content}' created!` })
    setTimeout(() => {
      this.setState({notification: ''})
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === Number(id))

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)
    this.setState({ anecdotes })
  }

  render() {
    const message = this.state.notification
    const anecdoteById = (id) => 
      this.state.anecdotes.find(a => a.id === Number(id))
    return (
      <div>
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            <Menu />
            <Notification message={message} />
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/create" render={({history}) => <CreateNew addNew={this.addNew} history={history}/>} />
            <Route path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({match}) => 
              <Anecdote anecdote={anecdoteById(match.params.id)} />
            } />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
