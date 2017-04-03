import React, { Component } from 'react'
import axios from 'axios'
import '../group.css';

//import components
import Search from './Search'
import Messages from './Messages'


class Group extends Component {
  constructor(props){
    super(props)
    this.state = {
      group: this.props.location.state.selected,
      creator: {},
      members: []
    }
    this.loadDataFromServer = this.loadDataFromServer.bind(this)
  }
  loadDataFromServer(){
    axios.get(`http://localhost:3001/api/groups/${this.state.group._id}`).then((res) => {
      this.setState({
        creator: res.data.creator,
        members: res.data.members
      })
    })
  }
  componentDidMount(){
    this.loadDataFromServer()
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
      <div className="group">
        <div className="group-info">
          <div className="group-title">
            <h1>{this.state.group.title}</h1>
          </div>
          <div className="members">
            <div>
              <h2>Members:</h2>
              <p>{this.state.creator.firstname} {this.state.creator.lastname} (creator)</p>
              {members}
            </div>
            <Search reload={() => this.loadDataFromServer()} group={this.state.group} />
          </div>
        </div>
        <div>
          <Messages group={this.state.group} />
        </div>
      </div>
    )
  }
}

export default Group
