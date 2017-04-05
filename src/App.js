import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// import { login, logout, isLoggedIn } from '../config/AuthService'
import './App.css';



// { ( isLoggedIn() ) ?
//   <div>
// <Link to="/profile">Profile</Link>
// <Link to="/logout" onClick={() => logout()}>Log Out</Link>
// </div>: ""
// }

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
      user: {},
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
      // var isLoggedIn = this.state.loggedIn
      // var toggleLink = null
      // var toggleLink2 = null
      // if (isLoggedIn){
      //   toggleLink = <Link to="/logout">Log Out</Link>
      //   toggleLink2 = <Link to="/profile">Profile</Link>
      // } else {
      //   toggleLink = <Link to="/login">Log In</Link>
      //   toggleLink2 = <Link to="/signup">Sign Up</Link>
      // }

    return (
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
            <div>
              <img src="https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/clock.png" />
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
                return(
                  <Login updateLogin={() => this.updateLogin()} user={this.state.user} />
                )
              }}
            />
            <Route
              path="/logout"
              render={() => {
                return(
                  <Logout updateLogout={() => this.updateLogout()}/>
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
