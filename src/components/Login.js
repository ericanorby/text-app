import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  handleUsername(event){
    this.setState({
      username: event.target.value
    })
  }

  handlePassword(event){
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let username = this.state.username.trim()
    let password = this.state.password.trim()
    axios.post("http://localhost:3001/api/login", {username: username, password: password})
    .then((response) => {
      console.log(response)
      this.setState({username: "", password: ""})
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
              <input type="text" placeholder="username" onChange={(e) => {this.handleUsername(e)}} />
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
