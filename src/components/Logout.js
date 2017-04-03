import React, { Component } from 'react'

class Logout extends Component {
  // constructor(props){
  //   super(props)
  // }

  componentDidMount(){
    this.props.updateLogout()
  }
  render(){
    return(
      <div>Logged out successfully.</div>
    )
  }
}

export default Logout
