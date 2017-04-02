import React, { Component } from 'react'
import axios from 'axios'
import cookie from "react-cookie"

class Logout extends Component {
  render(){
    cookie.remove("token", {path: "/"})
    return(
      <div>Logged out successfully.</div>
    )
  }
}

export default Logout
