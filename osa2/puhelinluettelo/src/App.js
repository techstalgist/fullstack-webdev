import React from 'react'
import personService from './services/persons'

const Poisto = ({onPersonDelete}) => {
  return (
    <button onClick={onPersonDelete}>poista</button>
  )
}

const Numero = ({numero, handlePersonDeletion}) => {
  return (
    <tr>
      <td>{numero.name}</td>
      <td>{numero.number}</td>
      <td><Poisto onPersonDelete={handlePersonDeletion}/></td>
    </tr>
  )
}

const Numerot = ({numerot, handlePersonDeletion}) => {
  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <tbody>
          {numerot.map(n => <Numero key={n.name} numero={n} handlePersonDeletion={handlePersonDeletion(n.id)}/>)}
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

const Ilmoitus = ({message}) => {
  if (message.length === 0) {
    return null
  }
  return (
    <div className='message'>{message}</div>
  )
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: ''
    }
  }

  componentWillMount() {
    personService.getAll().then(persons => { 
      this.setState({ persons }) 
    })
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

  handlePersonDeletion = (id) => {
    return () => {
      const personToDelete = this.state.persons.find(p => p.id === id)
      if (window.confirm(`Poistetaanko ${personToDelete.name}?`)) {
        personService.deleteOne(id).then(response => {
          this.setState({
            persons: this.state.persons.filter(p => p.id !== id),
            message: `Henkilö ${personToDelete.name} poistettiin.`
          })
          setTimeout(() => {
            this.setState({message: ''})
          }, 4000)
        })
      }
    }
  }

  addPerson = (e) => {
    e.preventDefault()

    if (this.state.persons.map(p => p.name).includes(this.state.newName)) {
      const person = this.state.persons.find(p => p.name === this.state.newName)
      const changedPerson = {...person, number: this.state.newNumber}
      personService.update(changedPerson.id, changedPerson).then(updatedPerson => {
        const nonChangedPersons = this.state.persons.filter(p => p.id !== updatedPerson.id)
        this.setState({
          persons: nonChangedPersons.concat(updatedPerson),
          newName: '',
          newNumber: '',
          message: `Henkilön ${updatedPerson.name} numeroa muutettiin.`
        })
        setTimeout(() => {
          this.setState({message: ''})
        }, 4000)
      })
      .catch(error => {
        alert(`Henkilö '${changedPerson.name}' on jo valitettavasti poistettu palvelimelta.`)
        personService.create(changedPerson).then(createdPerson => {
          const nonChangedPersons = this.state.persons.filter(p => p.id !== changedPerson.id)
          this.setState({
            persons: nonChangedPersons.concat(createdPerson),
            newName: '',
            newNumber: '',
            message: `Henkilön ${createdPerson.name} numero lisättiin.`
          })
          setTimeout(() => {
            this.setState({message: ''})
          }, 4000)
        })
      })
      return
    }
    const newPerson = {name: this.state.newName, number: this.state.newNumber}
    personService.create(newPerson).then(createdPerson => {
      this.setState({
        persons: this.state.persons.concat(createdPerson),
        newName: '',
        newNumber: '',
        message: `Henkilön ${createdPerson.name} numero lisättiin.`
      })
      setTimeout(() => {
        this.setState({message: ''})
      }, 4000)
    })
  }

  render() {
    const byId = (p1, p2) => p1.id - p2.id
    const personsToShow = this.state.filter.length > 0 ? this.state.persons.filter(p => p.name.search(new RegExp(this.state.filter, 'i')) !== -1) : this.state.persons
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Ilmoitus message={this.state.message}/>
        <Kentta name={"rajaa näytettäviä"} value={this.state.filter} onChange={this.handleFilterChange} />
        <h2>Lisää uusi/muuta olemassaolevan numeroa</h2>
        <form onSubmit={this.addPerson}>
          <Kentta name={"nimi:"} value={this.state.newName} onChange={this.handleNameChange}/>
          <Kentta name={"numero:"} value={this.state.newNumber} onChange={this.handleNumberChange}/>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <Numerot numerot={personsToShow.sort(byId)} handlePersonDeletion={this.handlePersonDeletion}/>
      </div>
    )
  }
}

export default App