import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setToken = this.setToken.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    axios
    .post('/auth/login', user)
    // .then(res => console.log(res.data))
    .then(res => {
      // Setting the token in localStorage
      // console.log(res.data.auth_token);
      this.setToken(res.data.auth_token); // Setting the token in localStorage
      this.props.history.push('/')
      return Promise.resolve(res);
    })
    .catch(err => console.log(err.response));
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  render () {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card card-container">
              <img
                id="profile-img"
                className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="blah"/>
              <p id="profile-name" className="profile-name-card"></p>
              <form className="form-signin"  onSubmit={ this.onSubmit }>
                <span id="reauth-email" className="reauth-email"></span>
                <input
                  id="inputEmail"
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                  name="email"
                  value={ this.state.email }
                  onChange={ this.onChange }
                  required
                  />
                <input
                  id="inputPassword"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={ this.state.password }
                  onChange={ this.onChange }
                  required
                  />
                <div id="remember" className="checkbox">
                  <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                  </div>
                  <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
                </form>
                <a href="" className="forgot-password">
                  Forgot the password?
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  export default Login;
