import React, { Component } from 'react'
import axios from 'axios'

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
    let group = this.props.group
    axios.post(`http://localhost:3001/api/groups/${group._id}/newmessage`, {content})
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
    window.location.reload()
  }

  render(){
    return(
      <div>
        <form onSubmit={(e) => {this.handleSubmit(e)}}>
          <div>
              <input type="text" placeholder="type message here" onChange={(e) => {this.handleContent(e)}} />
          </div>
          <div>
              <button type="submit">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

export default NewMessage
