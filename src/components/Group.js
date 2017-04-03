import React, { Component } from 'react'
import axios from 'axios'
import '../group.css';

//import components
import Search from './Search'
import Messages from './Messages'
import NewMessage from './NewMessage'

class Group extends Component {
  constructor(props){
    super(props)
    this.state = {
      group: this.props.location.state.selected,
      creator: {},
      members: [],
      messages: []
    }
  }
  componentDidMount(){
    axios.get(`http://localhost:3001/api/groups/${this.state.group._id}`).then((res) => {
      this.setState({
        creator: res.data.creator,
        members: res.data.members,
        messages: res.data.messages
      })
    })
  }
  render(){
    let members = this.state.members.map((user, index) => {
      return(
        <div key={index}>
          <p>{user.firstname} {user.lastname}</p>
        </div>
      )
    })
    return(
      <div className="flex">
        <div>
          <div className="group-title">
            <h1>{this.state.group.title}</h1>
            <p>Created by: {this.state.creator.firstname} {this.state.creator.lastname}</p>
          </div>
          <div className="flex">
            <div>
              <h2>Members:</h2>
              {members}
            </div>
            <Search group={this.state.group} />
          </div>
        </div>
        <NewMessage group={this.state.group} />
        <Messages messages={this.state.messages} />
      </div>
    )
  }
}

export default Group
