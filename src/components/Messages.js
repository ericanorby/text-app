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
    if (this.state.messages.length < 6) {
      axios.post(`http://localhost:3001/api/groups/${this.props.group._id}/messages`, message)
      .then((res) => {
          let messages = this.state.messages
          let newMessages = messages.concat([res.data])
          this.setState({
            messages: newMessages
          })
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      this.setState({
        flash: "You can't have more than 6 messages at a time."
      })
    }
  }

  handleDeleteMessage(event, index, messageId){
    event.preventDefault()
    this.setState({
      messages: this.state.messages.filter((_, i) => i !== index)
    })
    axios({
      method: 'delete',
      url: `http://localhost:3001/api/groups/${this.props.group._id}/messages`,
      data: {id: messageId}
    })
    .then(() => {

    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentDidMount(){
    this.loadMessagesFromServer()
  }

  render(){
    let messages = this.state.messages.map((msg, index) => {
      return(
        <div key={index} className="message">
          <div>
            <p>{msg.content}</p>
            <span>{msg.datetime}</span>
          </div>
          <button className="delete-msg-btn" onClick={(e) => this.handleDeleteMessage(e, index, msg._id)}><i className="fa fa-times" aria-hidden="true"></i></button>
        </div>
      )
    })
    return(
      <div className="message-container">
        <h1>Messages</h1>
        {messages}
        <NewMessage onSubmitMsg={(e) => this.handleNewMessage(e)} messages={this.state.messages} group={this.props.group} />
        {this.state.flash}
      </div>
    )
  }
}

export default Messages
