import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../profile.css';
import NewGroup from './NewGroup'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


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

  handleNewGroup(group){
    axios.post("http://localhost:3001/api/group/new", group)
    .then((res) => {
      let groups = this.state.groups
      let newGroups = groups.concat([res.data])
      this.setState({
        groups: newGroups
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount(){
    this.loadGroupsFromServer()
  }

  render(){
    var groups = this.state.groups.map((group, index) => {
      let pathname = `/groups/${group._id}`
      return(
        <Link key={index} to={{pathname, state: {selected: group}}}>
        <div className="group-box">
          <h3>{group.title}</h3>
          <p>{group.users.length + 1} <i className="fa fa-user" aria-hidden="true"></i></p>
        </div>
        </Link>
      )
    })
    return(
      <div className="profile">
        <div className="user-profile">
          <h3>{this.state.user.email}</h3>
          <h3>{this.state.user.firstname} {this.state.user.lastname}</h3>
        </div>
        <h1>Your Groups</h1>
        <div className="group-container">
          {groups}
          <div className="group-box new-group">
            <p>Create a new group</p>
            <NewGroup submitGroup={(e) => this.handleNewGroup(e)} user={this.state.user} />
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
