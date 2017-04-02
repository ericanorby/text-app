import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookie';
import Search from './Search'

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {}
    }
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api/profile", {
      headers: { 'Authorization': cookie.load('token') }
    }).then((res) => {
      this.setState({
        user: res.data
      })
    })
  }
  render(){
    return(
      <div>
        <h1>User Profile</h1>
        <h1>{this.state.user.email}</h1>
        <Search />
      </div>
    )
  }
}

export default Profile
