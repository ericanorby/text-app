import React, { Component } from 'react'
import axios from 'axios'
import '../group.css';
import { Redirect } from 'react-router-dom'

//import components
import Search from './Search'
import Messages from './Messages'


class Group extends Component {
  constructor(props){
    super(props)
    this.state = {
      group: this.props.location.state.selected,
      creator: {},
      members: [],
      deleted: false
    }
    this.loadDataFromServer = this.loadDataFromServer.bind(this)
  }

  loadDataFromServer(){
    axios.get(`http://localhost:3001/api/groups/${this.state.group._id}`)
    .then((res) => {
      this.setState({
        creator: res.data.creator,
        members: res.data.members
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleDelete(){
    axios.delete(`http://localhost:3001/api/groups/${this.state.group._id}`)
    .catch((err) => {
      console.log(err)
    })
    this.setState({
      deleted: true
    })
  }

  componentDidMount(){
    this.loadDataFromServer()
  }

  render(){
    if (this.state.deleted) {
      return <Redirect to="/profile" />
    }
    let members = this.state.members.map((user, index) => {
      return(
        <div key={index}>
          <p>{user.firstname} {user.lastname}</p>
        </div>
      )
    })
    return(
        <div className="group">
          <div>
            <div className="group-info">
              <div className="group-title">
                <h1>{this.state.group.title}</h1>
              </div>
              <div className="members">
                <div>
                  <h2>Members</h2>
                  <p>{this.state.creator.firstname} {this.state.creator.lastname} (creator)</p>
                  {members}
                </div>
                <Search reload={() => this.loadDataFromServer()} group={this.state.group} />
              </div>
            </div>
            <button id="delete-group-btn" onClick={(e) => this.handleDelete(e)}>Delete Group</button>
          </div>
          <div>
            <Messages group={this.state.group} />
          </div>
        </div>
    )
  }
}

export default Group
