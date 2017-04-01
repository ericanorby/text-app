import React, { Component } from 'react'
// import axios from 'axios'

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {}
    }
  }
  // componentDidMount(){
  //   axios.get("http://localhost:3001/api/user").then((res) => {
  //     this.setState({
  //       user: res.data
  //     })
  //   })
  // }
  render(){
    return(
      <div>
      </div>
    )
  }
}

export default Profile
