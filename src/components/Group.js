import React, { Component } from 'react'
import axios from 'axios'

class Group extends Component {
  constructor(props){
    super(props)
    this.state = {
      group: this.props.location.state.selected,
      members: []
    }
  }
  componentDidMount(){
    axios.get(`http://localhost:3001/api/groups/${this.state.group._id}`).then((res) => {
      this.setState({
        members: res.data
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
        <h2>Members:</h2>
        {members}
      </div>
    )
  }
}

export default Group
