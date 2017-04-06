import React, { Component } from 'react'

    // <p>Text App makes it easy to send automated text messages to groups of people. Once you have created an account, you can create a new group and invite others by phone number. Then, simply begin scheduling messages!</p>

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: ""
    }
  }
  render(){
    var today = new Date();
    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes();
    var datetime = date+' '+time;
    return(
      <div className="homepage">
        <img src="https://republicwireless.com/static/svg/phone-outline.032fa01316.svg" />
        <div>
          <p>The current date and time is</p>
          <p className="current-date">{datetime}</p>
          <p>When will you receive your next message?</p>
          <button id="login-btn">Log In</button>
        </div>
      </div>
    )
  }
}

export default Home
