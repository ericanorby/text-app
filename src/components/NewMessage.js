import React, { Component } from 'react'
import $ from 'jquery'

class NewMessage extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: ""
    }
  }

  handleContent(event){
    this.setState({
      content: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let content = this.state.content.trim()
    if (!content){
      return;
    }
    this.props.onSubmitMsg({content})
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
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
}

export default NewMessage
