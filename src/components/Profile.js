import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookie';
import { Link } from 'react-router-dom'
import '../profile.css';
import NewGroup from './NewGroup'


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
      let pathname = `/groups/${group._id}`
      return(
        <div key={index} className="group-box">
          <Link to={{pathname, state: {selected: group}}}>
          <h3>{group.title}</h3>
          </Link>
          <p>{group.users.length + 1} Members</p>
        </div>
      )
    })
    return(
      <div>
        <h1>User Profile</h1>
        <h3>{this.state.user.email}</h3>
        <h3>{this.state.user.firstname} {this.state.user.lastname}</h3>
        <h1>Create a new group:</h1>
        <NewGroup user={this.state.user} />
        <h1>Groups you belong to:</h1>
        <div className="group-container">
          {groups}
        </div>
      </div>
    )
  }
}

export default Profile
