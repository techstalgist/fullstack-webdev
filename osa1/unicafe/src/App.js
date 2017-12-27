import React from 'react';

const Button = (props) => {
  const {handleClick, text} = props;
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = (props) => {
  const {name, value} = props;
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const {arviot} = props;
  const arvioita = (arviot) => arviot.hyva+arviot.neutraali+arviot.huono
  
  const metriikat = (arviot) => {
    const hyva = arviot.hyva
    const huono = arviot.huono
    const jakaja = arvioita(arviot)
    if (jakaja === 0) return {ka: 0, pos: 0}
    return {ka: (hyva - huono) / jakaja, pos: hyva/jakaja*100}
  }

  const statistiikat = (arviot) => {
    if (arvioita(arviot) === 0) {
      return (<p>Yhtään palautetta ei ole annettu</p>)
    }
    return (
      <div>
        <table>
          <tbody>
            <Statistic name="hyvä" value={arviot.hyva} />
            <Statistic name="neutraali" value={arviot.neutraali} />
            <Statistic name="huono" value={arviot.huono} />
            <Statistic name="keskiarvo" value={metriikat(arviot).ka} />
            <Statistic name="positiivisia" value={metriikat(arviot).pos + " %"} />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistiikka</h1>
      {statistiikat(arviot)}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  klik = (type) => () => this.setState({[type]: this.state[type] +1 })

  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button handleClick={this.klik("hyva")} text="hyvä"/>
        <Button handleClick={this.klik("neutraali")} text="neutraali"/>
        <Button handleClick={this.klik("huono")} text="huono"/>
        <Statistics arviot={this.state} />
      </div>
    )
  }
  
}
export default App;
