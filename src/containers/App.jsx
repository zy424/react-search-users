import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Search from '../components/Search'
import Main from '../components/Main'
import {setSearchName} from '../redux/actions/Actions'

class App extends Component{
  render(){
    const {searchName, setSearchName} = this.props
    return(
      <div>
        <Search
          searchName = {searchName}
          setSearchName = {setSearchName}/>
        <Main searchName = {searchName}/>
      </div>
    )
  }
}
App.propTypes = {
  searchName: PropTypes.string.isRequired,
  setSearchName: PropTypes.func.isRequired,
}

export default connect( state => ({searchName:state.searchName}),
  {setSearchName})(App)
