import React, { Component } from 'react'
import axios from 'axios'

//import components
import Search from './Search'

class Group extends Component {
  constructor(props){
    super(props)
    this.state = {
      group: this.props.location.state.selected,
      creator: {},
      members: []
    }
  }
  componentDidMount(){
    axios.get(`http://localhost:3001/api/groups/${this.state.group._id}`).then((res) => {
      this.setState({
        creator: res.data.creator,
        members: res.data.members
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
      <div>
        <h1>{this.state.group.title}</h1>
        <p>Created by: {this.state.creator.firstname} {this.state.creator.lastname}</p>
        <h2>Members:</h2>
        {members}
        <h2>Add another user:</h2>
        <Search group={this.state.group} />
      </div>
    )
  }
}

export default Group
