import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookie';
import Search from './Search'

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {},
      groups: []
    }
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api/profile", {
      headers: { 'Authorization': cookie.load('token') }
    }).then((res) => {
      this.setState({
        user: res.data.user,
        groups: res.data.groups
      })
    })
  }
  render(){
    var groups = this.state.groups.map((group, index) => {
      return(
        <div key={index}>
          <h3>{group.title}</h3>
          <p>{group.users.length} Members</p>
        </div>
      )
    })
    return(
      <div>
        <h1>User Profile</h1>
        <h3>{this.state.user.email}</h3>
        <h3>{this.state.user.firstname} {this.state.user.lastname}</h3>
        <h1>Groups you belong to:</h1>
        {groups}
        <Search />
      </div>
    )
  }
}

export default Profile
