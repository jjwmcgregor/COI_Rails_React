import React, { Component } from 'react';
import axios from 'axios';

import UserRow from './UserRow.js';

class Users extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      errors: []
    }

    this.getUsers();
  }

  getUsers(){
    const header = {
      headers: {
        "Authorization": localStorage.getItem('id_token')
      }
    }
    axios
      .get(
        '/users',
        header
      )
      .then(res => {
        this.setState({
          users: res.data
        })
      })
      .catch(err => {
        this.setState({
          errors: err
        })
      })
  }

  render(){
    console.log(this.state);
    let user;
    if(this.state.users) {
      user = this.state.users.map(user => {
        return (
          <UserRow key={ user.id } user={ user } />
        )
      })
    }

    return(
      <div className="container pt-2 text-center">
        <div className="row">
          <div className="col-md-8 offset-md-2 col-xs-12">
            <h3>All Users</h3>
            <table className="table text-left">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                { user }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Users;
