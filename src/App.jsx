import React, {Component} from 'react'

import Search from './components/Search'
import Main from './components/Main'

export default class App extends Component{
  render(){
    return(
      <div>
        <Search/>
        <Main/>
      </div>
    )
  }
}