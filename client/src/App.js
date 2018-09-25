import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
// import axios from 'axios';
// Components
// ==== Static
import Navbar from './components/layout/Navbar.js';
// import Footer from './components/layout/Footer.js';
// ==== Auth
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';

// ==== Users
import Users from './components/resources/users/Users.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={ Users } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/register" component={ Register } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
