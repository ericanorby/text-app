import React, { Component } from 'react'
import $ from 'jquery'

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
    if (!title){
      return
    }
    this.props.submitGroup({title: title, creator: this.props.user})
    this.setState({
      title: ""
    })
    $("#title-field").val("")
  }

  render(){
    return(
      <div>
        <form onSubmit={(e) => {this.handleSubmit(e)}}>
          <div>
              <input type="text" id="title-field" placeholder="title" onChange={(e) => {this.handleTitle(e)}} />
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
