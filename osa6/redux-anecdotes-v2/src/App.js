import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import {connect} from 'react-redux'
import {initialize} from './reducers/anecdoteReducer'

class App extends React.Component {

  componentWillMount = async () => {
    this.props.initialize()
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

export default connect(null, {initialize})(App)