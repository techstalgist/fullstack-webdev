import React from 'react';
import Button from './components/Button'
import Statistics from './components/Statistics'

class App extends React.Component {

  klik = (type) => () => this.props.store.dispatch({type})
  
  tyhjenna = () => {
    this.props.store.dispatch({type: 'ZERO'})
  }

  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button handleClick={this.klik("GOOD")} text="hyvä"/>
        <Button handleClick={this.klik("OK")} text="neutraali"/>
        <Button handleClick={this.klik("BAD")} text="huono"/>
        <Statistics arviot={this.props.store.getState()} />
        <Button handleClick={this.tyhjenna} text="nollaa tilasto" />
      </div>
    )
  }
  
}
export default App;
