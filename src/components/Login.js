import React, { Component } from 'react'
import axios from 'axios'

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
    this.props.updateLogin()
    event.preventDefault()
    let email = this.state.email.trim()
    let password = this.state.password.trim()
    axios.post("http://localhost:3001/api/login", {email, password})
    .then((res) => {
      this.props.updateLogin()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render(){
    return(
      <div className="user-form">
        <h1>Login</h1>
        <form onSubmit={(e) => {this.handleSubmit(e)}}>
          <div>
              <input type="text" placeholder="Email" onChange={(e) => {this.handleEmail(e)}} />
          </div>
          <div>
              <input type="password" placeholder="Password" onChange={(e) => {this.handlePassword(e)}} />
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
