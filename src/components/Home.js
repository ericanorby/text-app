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
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
    var datetime = date+' '+time;
    return(
      <div>
        {datetime}
      </div>
    )
  }
}

export default Home
