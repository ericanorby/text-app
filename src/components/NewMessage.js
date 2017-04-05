import React, { Component } from 'react'
import $ from 'jquery'


class NewMessage extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: "",
      datetime: "",
      date: "",
      time: ""
    }
  }

  handleContent(event){
    this.setState({
      content: event.target.value
    })
  }

  handleDateTime(event){
    this.setState({
      datetime: event.target.value
    })
  }
  //
  // handleDate(event){
  //   this.setState({
  //     date: event.target.value
  //   })
  // }
  //
  // handleTime(event){
  //   this.setState({
  //     time: event.target.value
  //   })
  // }

  handleSubmit(event){
    event.preventDefault()
    let content = this.state.content.trim()
    let datetime = this.state.datetime
    if (!content || !datetime){
      return;
    }
    this.props.onSubmitMsg({content, datetime})
    this.setState({
      content: ""
    })
    $("#message-field").val("")
  }

  render(){
    return(
      <div>
        <form onSubmit={(e) => {this.handleSubmit(e)}}>
          <input id="message-field" type="text" placeholder="type message here" onChange={(e) => {this.handleContent(e)}} />
          <input type="datetime-local" onChange={(e) => {this.handleDateTime(e)}}/>

        <button type="submit">Create</button>
        </form>
      </div>
    )
  }
}

export default NewMessage
