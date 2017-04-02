import React, { Component } from 'react'

class Search extends Component {
  render(){
    return(
      <div>
        <input type="text" placeholder="search" />
        <button type="submit">Submit</button>
      </div>
    )
  }
}

export default Search
