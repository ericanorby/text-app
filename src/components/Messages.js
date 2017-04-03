import React, { Component } from 'react'
import NewMessage from './NewMessage'
import axios from 'axios'

class Messages extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      flash: ""
    }
    this.loadMessagesFromServer = this.loadMessagesFromServer.bind(this)
  }

  loadMessagesFromServer(){
    axios.get(`http://localhost:3001/api/groups/${this.props.group._id}`).then((res) => {
      this.setState({
        messages: res.data.messages
      })
    })
  }

  handleNewMessage(message){
    if (this.state.messages.length < 6){
      let messages = this.state.messages
      let newMessages = messages.concat([message])
      this.setState({
        messages: newMessages
      })
    }
    axios.post(`http://localhost:3001/api/groups/${this.props.group._id}/newmessage`, message)
    .then((res) => {
      this.setState({
        flash: res.data.message
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount(){
    this.loadMessagesFromServer()
  }

  render(){
    let messages = this.state.messages.map((message, index) => {
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
      <NewMessage onSubmitMsg={(e) => this.handleNewMessage(e)} group={this.props.group} />
      {this.state.flash}
      </div>
    )
  }
}

export default Messages
