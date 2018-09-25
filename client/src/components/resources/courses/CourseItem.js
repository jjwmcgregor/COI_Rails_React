import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CourseItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      course: props.course
    }
  }

  onDelete(){
    let courseID = this.state.course.id;
    axios
      .delete(
        `/courses/${courseID}`,
        {
          headers: {
            "Authorization": localStorage.getItem('id_token')
          }
        }
      )
      .then(response => {
          this.props.history.push('/courses')
        },
        window.location.reload(true)
      )
      .then(() => {
        window.reload(true)
      })
      .catch(err => console.log(err));
  }

  render(){
    return (
      <tr>
        <td>
          <Link to={`/courses/${this.props.course.id}`}>
            { this.props.course.name }
          </Link>
        </td>
        <td>
          <Link to={`/courses/${this.props.course.id}/edit`}>
            <i className="fas fa-pencil-alt"></i>
          </Link>
        </td>
        <td>
          <i className="fas fa-times" onClick={this.onDelete.bind(this)}></i>
        </td>
      </tr>
    )
  }
}

CourseItem.propTypes = {
  course: PropTypes.object
}

export default CourseItem;
