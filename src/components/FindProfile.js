import React, { Component } from 'react'


class FindProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      phone: ""
    }
  }

  handlePhone(event){
    this.setState({
      phone: event.target.value
    })
  }

  findUser(event){
    event.preventDefault()
    let phone = this.state.phone.trim()
    this.props.submitQuery(phone)
  }

  render(){
    return(
      <div>
        <input type="text" onChange={(e) => this.handlePhone(e)} placeholder="enter phone number" />
        <button onClick={(e) => this.findUser(e)}>Find profile</button>
      </div>
    )
  }
}

export default FindProfile
