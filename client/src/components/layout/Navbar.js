import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render () {
    return(
      <nav className="navbar navbar-expand-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">IMC</Link>
          <Link to="/courses" className="nav-link px-2">Courses</Link>
          <Link to="/cohorts" className="nav-link px-2">Cohorts</Link>
          <ul className="navbar-nav ml-auto d-flex flex-row">
            <li className="nav-item active">
              <Link to="/login" className="nav-link px-2">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link px-2">Register</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;
