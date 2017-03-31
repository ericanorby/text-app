import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios'
import './App.css';
import About from './components/About'
import Users from './components/Users'
import SignIn from './components/SignIn'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api").then((res) => {
      this.setState({
        users: res.data
      })
    })
  }
  render() {
    return (
      <Router>
        <div>
          <nav>
            <h1>Text App</h1>
            <Link to="/about">About</Link>
            <Link to="/users">Users</Link>
            <Link to="/sign_in">Sign In</Link>
          </nav>
          <main>
            <Route
              path="/about"
              render={() => {
                return(
                  <About />
                )
              }}
            />
            <Route
              path="/users"
              render={() => {
                return(
                  <Users users={this.state.users} />
                )
              }}
            />
            <Route
              path="/sign_in"
              render={() => {
                return(
                  <SignIn />
                )
              }}
            />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
