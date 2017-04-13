import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import './App.css';

//import components
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/Login'
import Logout from './components/Logout'
import Signup from './components/Signup'
import Group from './components/Group'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  updateLogin(){
    this.setState({
      loggedIn: true
    })
  }

  updateLogout(){
    this.setState({
      loggedIn: false
    })
  }

  render() {
      var toggleLink = null
      var toggleLink2 = null
      if (this.state.loggedIn) {
        toggleLink = <Link to="/logout">Log Out <i className="fa fa-sign-out" aria-hidden="true"></i></Link>
        toggleLink2 = <Link to="/profile">Profile</Link>
      } else {
        toggleLink = <Link to="/login">Log In</Link>
        toggleLink2 = <Link to="/signup">Sign Up</Link>
      }

    return (
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <div>
              <img src="https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/clock.png" alt="clock" />
              <h1>TextSet</h1>
            </div>
        </nav>
          <main>
            <Route
              exact path="/"
              render={() => {
                return(
                  <Home />
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
                if (this.state.loggedIn){
                  return <Redirect to="/profile" />
                }
                return(
                  <Login updateLogin={() => this.updateLogin()} />
                )
              }}
            />
            <Route
              path="/logout"
              render={() => {
                return(
                  <Logout updateLogout={() => this.updateLogout()} />
                )
              }}
            />
            <Route
              path="/signup"
              render={() => {
                if (this.state.loggedIn){
                  return <Redirect to="/profile" />
                }
                return(
                  <Signup updateLogin={() => this.updateLogin()} />
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
