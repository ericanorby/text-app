import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css';

//import components
import About from './components/About'
import Profile from './components/Profile'
import Login from './components/Login'
import Logout from './components/Logout'
import Signup from './components/Signup'
import Group from './components/Group'

class App extends Component {
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
            <Route
              path="/groups/:id"
              component={Group}
            />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
