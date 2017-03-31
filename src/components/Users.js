import React, { Component } from 'react'
import axios from 'axios'

class Users extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api").then((res) => {
      this.setState({
        users: res.data
      })
    })
  }
  render(){
    let users = this.state.users.map((user, index) => {
      return(
        <div key={index}>
          <p>{user.firstname}</p>
        </div>
      )
    })
    return(
      <div>
        <h1>All users</h1>
        {users}
      </div>
    )
  }
}

export default Users
