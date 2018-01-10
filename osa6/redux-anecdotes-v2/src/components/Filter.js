import React from 'react'
import {filterSetting} from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
    handleChange = (e) => {
      this.props.filterSetting(e.target.value)
    }
    render() {
      const style = {
        marginBottom: 10,
        marginTop: 10
      }
  
      return (
        <div style={style}>
          filter <input onChange={this.handleChange}/>
        </div>
      )
    }
}
 
export default connect(null, {filterSetting})(Filter)