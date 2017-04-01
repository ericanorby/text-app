import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios'
import './App.css';

//import components
import About from './components/About'
import Users from './components/Users'
import Profile from './components/Profile'
import Login from './components/Login'
import Signup from './components/Signup'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }
  // componentDidMount(){
  //   axios.get("http://localhost:3001/api").then((res) => {
  //     this.setState({
  //       users: res.data
  //     })
  //   })
  // }
  render() {
    return (
      <Router>
        <div>
          <nav>
            <h1>Text App</h1>
            <Link to="/about">About</Link>
            <Link to="/users">Users</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
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
              path="/profile"
              render={() => {
                return(
                  <Profile />
                )
              }}
            />
            <Route
              path="/login"
              render={() => {
                return(
                  <Login />
                )
              }}
            />
            <Route
              path="/signup"
              render={() => {
                return(
                  <Signup />
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
