import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phone: "",
      username: ""
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

  handleFirstName(event){
    this.setState({
      firstname: event.target.value
    })
  }

  handleLastName(event){
    this.setState({
      lastname: event.target.value
    })
  }

  handlePhone(event){
    this.setState({
      phone: event.target.value
    })
  }

  handleUsername(event){
    this.setState({
      username: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let email = this.state.email.trim()
    let password = this.state.password.trim()
    let phone = this.state.phone.trim()
    let username = this.state.username.trim()
    axios.post("http://localhost:3001/api/signup", {email, password, phone, username})
    .then((response) => {
      console.log(response)
      this.setState({email: "", password: ""})
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
              <input type="text" placeholder="username" onChange={(e) => {this.handleUsername(e)}} />
          </div>
          <div>
              <input type="password" placeholder="password" onChange={(e) => {this.handlePassword(e)}} />
          </div>
          <div>
              <input type="text" placeholder="first name" onChange={(e) => {this.handleFirstName(e)}} />
          </div>
          <div>
              <input type="text" placeholder="last name" onChange={(e) => {this.handleLastName(e)}} />
          </div>
          <div>
              <input type="text" placeholder="phone number" onChange={(e) => {this.handlePhone(e)}} />
          </div>
          <div>
              <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Signup
