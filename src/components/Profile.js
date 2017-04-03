import React, { Component } from 'react'
import axios from 'axios'
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
    this.loadGroupsFromServer = this.loadGroupsFromServer.bind(this)
  }
  loadGroupsFromServer(){
    axios.get("http://localhost:3001/api/profile").then((res) => {
      this.setState({
        user: res.data.user,
        groups: res.data.groups
      })
    })
  }
  componentDidMount(){
    this.loadGroupsFromServer()
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
        <div className="user-profile">
          <h1>User Profile</h1>
          <h3>{this.state.user.email}</h3>
          <h3>{this.state.user.firstname} {this.state.user.lastname}</h3>
        </div>
        <h1>Groups you belong to:</h1>
        <div className="group-container">
          {groups}
          <div className="group-box new-group">
            <p>Add a new group</p>
            <NewGroup reload={() => this.loadGroupsFromServer()} user={this.state.user} />
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
