import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css';
import About from './components/About'
import Users from './components/Users'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <h1>Text App</h1>
            <Link to="/about">About</Link>
            <Link to="/users">Users</Link>
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
                  <Users />
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
