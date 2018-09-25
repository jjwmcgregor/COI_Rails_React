import React, { Component } from 'react';
import axios from 'axios';
// import classnames from 'classnames';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault();

    const newUser = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password_digest: this.state.passwordConfirmation
    }

    axios
      .post('/signup', newUser)
      .then(res => {
        this.setToken(res.data.auth_token); // Setting the token in localStorage
        this.props.history.push('/auth/login');
      })
      .catch(err => {
        this.setState({errors: err.response });
        this.props.history.push('/login');
      });

    console.log(newUser);
  }

  render () {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card card-container">
              <img
                id="profile-img"
                className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile"
              />
              <p id="profile-name" className="profile-name-card"></p>
              <form className="form-signin" onSubmit={ this.onSubmit }>
                <span id="reauth-email" className="reauth-email"></span>
                <input
                  id="inputFirstName"
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  name="firstName"
                  value={ this.state.firstName }
                  onChange={ this.onChange.bind(this) }
                />
                <input
                  id="inputLastName"
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  name="lastName"
                  value={ this.state.lastName }
                  onChange={ this.onChange.bind(this) }
                />
                <input
                  id="inputEmail"
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                  name="email"
                  value={ this.state.email }
                  onChange={ this.onChange.bind(this) }
                />
                <input
                  id="inputPassword"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={ this.state.password }
                  onChange={ this.onChange.bind(this) }
                />
                <input
                  id="inputPasswordConfirmation"
                  type="password"
                  className="form-control"
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                  value={ this.state.passwordConfirmation }
                  onChange={ this.onChange.bind(this) }
                />
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

export default Register;
