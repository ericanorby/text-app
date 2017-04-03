import React, { Component } from 'react'
import axios from 'axios'

//this component will be used to search for a user and send that user a request to join a group
class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      input: "",
      result: null,
      flash: ""
    }
    this.clearFlash = this.clearFlash.bind(this)
  }

  handleSearchInput(event){
    this.setState({
      input: event.target.value
    })
  }

  handleSearchQuery(event){
    event.preventDefault()
    let input = this.state.input.trim()
    axios.post("http://localhost:3001/api/users/search", {input})
    .then((res) => {
      this.setState({
        result: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  clearFlash(){
    this.setState({
      flash: ""
    })
  }

  handleAddUser(event){
    event.preventDefault()
    let user = this.state.result
    let group = this.props.group
    axios.post(`http://localhost:3001/api/groups/${group._id}/add`, {user})
    .then((res) => {
      this.setState({
        flash: res.data.message
      })
      this.props.reload()
      setTimeout(this.clearFlash, 5000)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render(){
    var results = null
    if (this.state.result) {
      results = <div className="results">{this.state.result.firstname} <button onClick={(e) => {this.handleAddUser(e)}}>Add this user</button></div>
    }
    return(
      <div className="search-box">
        <h4>Add new member:</h4>
        <form onSubmit={(e) => {this.handleSearchQuery(e)}}>
          <input type="text" placeholder="phone number" onChange={(e) => {this.handleSearchInput(e)}} />
          <button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
        </form>
        {results}
        {this.state.flash}
      </div>
    )
  }
}

export default Search
