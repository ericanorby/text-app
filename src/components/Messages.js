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
    axios.post(`http://localhost:3001/api/groups/${this.props.group._id}/messages`, message)
    .then((res) => {
        let messages = this.state.messages
        let newMessages = messages.concat([res.data])
        this.setState({
          messages: newMessages,
          flash: res.data.message
        })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleDeleteMessage(event, index, messageId){
    // console.log(index)
    // console.log(messageId)
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
    let messages = this.state.messages.map((message, index) => {
      return(
        <div key={index} className="message">
          <p>{message.content}</p>
          <p>{message.datetime}</p>
          <button className="delete-msg-btn" onClick={(e) => this.handleDeleteMessage(e, index, message._id)}><i className="fa fa-times" aria-hidden="true"></i></button>
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
