import React, { Component } from 'react'
import axios from 'axios'
import cookie from "react-cookie"

class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  handleEmail(event){
    this.setState({
      email: event.target.value
    })
  }

  handlePassword(event){
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let email = this.state.email.trim()
    let password = this.state.password.trim()
    axios.post("http://localhost:3001/api/login", {email, password})
    .then((res) => {
      console.log(res.data)
      cookie.save('token', res.data.token, { path: "/"})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={(e) => {this.handleSubmit(e)}}>
          <div>
              <input type="text" placeholder="email" onChange={(e) => {this.handleEmail(e)}} />
          </div>
          <div>
              <input type="password" placeholder="password" onChange={(e) => {this.handlePassword(e)}} />
          </div>
          <div>
              <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
