import React, { Component } from 'react';

class UserRow extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <tr>
        <td>{ this.props.user.id }</td>
        <td>{ this.props.user.first_name } { this.props.user.last_name }</td>
        <td><small>{ this.props.user.email }</small></td>
      </tr>
    )
  }
}

export default UserRow;
