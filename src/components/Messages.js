import React, { Component } from 'react'

class Messages extends Component {
  render(){
    let messages = this.props.messages.map((message, index) => {
      return(
        <div key={index} className="message">
          <p>{message.content}</p>
        </div>
      )
    })
    return(
      <div>
      <h1>Messages</h1>
      {messages}
      </div>
    )
  }
}

export default Messages
