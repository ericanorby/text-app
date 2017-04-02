import React, { Component } from 'react'
import axios from 'axios'

//this component will be used to search for a user and send that user a request to join a group
class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      input: "",
      result: ""
    }
  }

  handleSearchInput(event){
    this.setState({
      input: event.target.value
    })
  }

  handleSearchQuery(event){
    event.preventDefault()
    let input = this.state.input.trim()
    axios.post(`http://localhost:3001/api/users/search/${input}`)
    .then((res) => {
      this.setState({
        result: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={(e) => {this.handleSearchQuery(e)}}>
        <input type="text" placeholder="phone number" onChange={(e) => {this.handleSearchInput(e)}} />
        <button type="submit">Submit</button>
        </form>
        {this.state.result.firstname}
      </div>
    )
  }
}

export default Search
