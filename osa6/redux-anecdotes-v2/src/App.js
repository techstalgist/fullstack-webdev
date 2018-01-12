import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import {connect} from 'react-redux'
import {anecdoteInitialization} from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

class App extends React.Component {

  componentWillMount = async () => {
    const anecdotes = await anecdoteService.getAll()
    this.props.anecdoteInitialization(anecdotes)
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </div>
    )
  }
}

export default connect(null, {anecdoteInitialization})(App)