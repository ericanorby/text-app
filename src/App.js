import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios'
import './App.css';
import cookie from 'react-cookie';

//import components
import About from './components/About'
import Profile from './components/Profile'
import Login from './components/Login'
import Logout from './components/Logout'
import Signup from './components/Signup'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: cookie.load('token')
    }
  }
  render() {

    return (
      <Router>
        <div>
          <nav>
            <h1>Text App</h1>
            <Link to="/about">About</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Log Out</Link>
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
              path="/profile"
              component={Profile}
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
              path="/logout"
              render={() => {
                return(
                  <Logout />
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
