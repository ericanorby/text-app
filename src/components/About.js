import React, { Component } from 'react'
import axios from 'axios'

class About extends Component {
  componentDidMount(){
    axios.get("http://localhost:3001/api")
    .then((res) => {
      console.log("hello")
    })
    .catch((err) => {
      console.log(err);
    })
  }
  render(){
    return(
      <div>
        <p>Text App makes it easy to send automated text messages to groups of people. Once you have created an account, you can create a new group and invite others by phone number. Then, simply begin scheduling messages!</p>
      </div>
    )
  }
}

export default About
