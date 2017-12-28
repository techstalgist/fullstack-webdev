import React, { Component } from 'react';
import axios from 'axios'

const Filter = ({name, value, onChange}) => {
  return (
    <div>{name}: <input value={value} onChange={onChange}/></div>
  )
}

const Countries = ({countries, onCountryClick}) => {
  return (
    <div>
      {countries.map(c => <div onClick={onCountryClick} key={c.name}>{c.name}</div>)}
    </div>
  )
}

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} alt="Country flag" width="50%" height="50%"/>
    </div>
  )
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentWillMount() {
    axios.get('https://restcountries.eu/rest/v2/all').then(resp => {
      this.setState({countries: resp.data})
    })
  }

  handleFilterChange = (e) => {
    this.setState({filter: e.target.value})
  }

  handleCountryClick = (e) => {
    this.setState({filter: e.target.textContent})
  }

  render() {
    const matchingCountries = this.state.countries.filter(c => c.name.search(new RegExp(this.state.filter, 'i')) !== -1)
    const renderCountries = () => {
      if (this.state.filter.length === 0) {
        return (<div>Enter a country name.</div>)
      }
      if (matchingCountries.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
      } else if (matchingCountries.length > 1) {
        return (<Countries countries={matchingCountries} onCountryClick={this.handleCountryClick} />)
      } else if (matchingCountries.length === 1) {
        return (<Country country={matchingCountries[0]}/>)
      } else {
        return (<div>Found no countries</div>)
      }
    }

    return (
      <div>
        <Filter name="find countries" value={this.state.filter} onChange={this.handleFilterChange}/>
        {renderCountries()}
      </div>
    );
  }
}

export default App;
