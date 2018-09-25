import React, { Component } from 'react';
import CourseItem from './CourseItem';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Courses extends Component {
  constructor(){
    super();
    this.state = {
      courses: [],
      errors: {}
    }
  }

  componentWillMount(){
    this.getCourses();
  }

  getCourses(){
    axios.get(
        '/courses',
        {
          headers: {
            "Authorization": localStorage.getItem('id_token')
          }
        }).then(data =>
        this.setState({
          courses: data.data
        })
      ).catch(err =>
        this.setState({
          errors: err
        }));
  }

  render () {
    let courseItems;
    if (this.state.courses) {
      courseItems = this.state.courses.map(course => {
        return(
          <CourseItem key={ course.name } course={ course } />
        )
      });
    }

    return (
      <div className="container text-center">
        <div className="d-flex pt-3 justify-content-between">
          <Link to="/courses/new" className="nav-link">
            Add Course
          </Link>
          <h3>Courses</h3>
          <Link to="/cohorts" className="nav-link">
            Cohorts
          </Link>
        </div>
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Course Title</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            { courseItems }
          </tbody>
        </table>

      </div>
    )
  }
}

Courses.propTypes = {
  courses: PropTypes.array
}

export default Courses;
