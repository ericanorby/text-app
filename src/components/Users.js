import React, { Component } from 'react'

class Users extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let users = this.props.users.map((user, index) => {
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
