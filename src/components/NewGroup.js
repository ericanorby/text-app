import React, { Component } from 'react'
import axios from 'axios'

class NewGroup extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: ""
    }
  }

  handleTitle(event){
    this.setState({
      title: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let title = this.state.title.trim()
    let creator = this.props.user
    axios.post("http://localhost:3001/api/group/new", {title, creator})
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={(e) => {this.handleSubmit(e)}}>
          <div>
              <input type="text" placeholder="title" onChange={(e) => {this.handleTitle(e)}} />
          </div>
          <div>
              <button type="submit">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

export default NewGroup
