import React from 'react'

const Numero = ({numero}) => {
  return (
    <tr key={numero.name}>
      <td>{numero.name}</td>
      <td>{numero.number}</td>
    </tr>
  )
}

const Numerot = ({numerot}) => {
  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <tbody>
          {numerot.map(n => <Numero numero={n}/>)}
        </tbody>
      </table>  
    </div>
  )
}

const Kentta = ({name, value, onChange}) => {
  return (
    <div>
      {name} <input value={value} onChange={onChange}/>
    </div>
  )
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  handleNameChange = (e) => {
    this.setState({newName: e.target.value})
  }

  handleNumberChange = (e) => {
    this.setState({newNumber: e.target.value})
  }

  handleFilterChange = (e) => {
    this.setState({filter: e.target.value})
  }

  addPerson = (e) => {
    e.preventDefault()

    if (this.state.persons.map(p => p.name).includes(this.state.newName)) {
      alert("Henkilö on jo lisätty")
      return
    }
    const newPerson = {name: this.state.newName, number: this.state.newNumber}
    const persons = this.state.persons.concat(newPerson)
    this.setState({persons, newName: '', newNumber: ''})
  }

  render() {
    const personsToShow = this.state.filter.length > 0 ? this.state.persons.filter(p => p.name.includes(this.state.filter)) : this.state.persons
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Kentta name={"rajaa näytettäviä"} value={this.state.filter} onChange={this.handleFilterChange} />
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <Kentta name={"nimi:"} value={this.state.newName} onChange={this.handleNameChange}/>
          <Kentta name={"numero:"} value={this.state.newNumber} onChange={this.handleNumberChange}/>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <Numerot numerot={personsToShow}/>
      </div>
    )
  }
}

export default App