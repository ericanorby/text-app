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
      phone: ""
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

  handleSubmit(event){
    event.preventDefault()
    let email = this.state.email.trim()
    let password = this.state.password.trim()
    let firstname = this.state.firstname.trim()
    let lastname = this.state.lastname.trim()
    let phone = this.state.phone.trim()
    axios.post("http://localhost:3001/api/signup", {email, password, firstname, lastname, phone})
    .then((res) => {
      console.log(res.data)
      this.props.updateLogin(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render(){
    return(
      <div className="user-form">
        <h1>Sign Up</h1>
        <form onSubmit={(e) => {this.handleSubmit(e)}}>
          <div>
              <input type="text" placeholder="Email" onChange={(e) => {this.handleEmail(e)}} />
          </div>
          <div>
              <input type="password" placeholder="Password" onChange={(e) => {this.handlePassword(e)}} />
          </div>
          <div>
              <input type="text" placeholder="First name" onChange={(e) => {this.handleFirstName(e)}} />
          </div>
          <div>
              <input type="text" placeholder="Last name" onChange={(e) => {this.handleLastName(e)}} />
          </div>
          <div>
              <input type="text" placeholder="Phone number" onChange={(e) => {this.handlePhone(e)}} />
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
