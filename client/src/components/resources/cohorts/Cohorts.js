import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CohortItem from './CohortItem';

class Cohorts extends Component {
  constructor(){
    super();
    this.state = {
      cohorts: [],
      courses: [],
      errors: {}
    }

    this.courseName = '';

    this.getCohorts();

  }

  getCohorts(){
    axios
      .get(
        '/cohorts',
        {
          headers: {
            "Authorization": localStorage.getItem('id_token')
          }
        })
      .then(res => {
        this.setState({
          cohorts: res.data
        })
      })
      .catch(err => console.log(err))
  }

  render(){
    let cohortItems;
    if (this.state.cohorts) {
      cohortItems = this.state.cohorts.map((cohort, i) => {
        return(
          <CohortItem
            key={ i }
            cohort={ cohort }
          />
        )
      });
    }

    return(
      <div className="container text-center p-2">
      <div className="d-flex justify-content-between py-3">
        <Link to="/cohorts/new" className="nav-link">
          Add cohort
        </Link>
        <h3>Cohorts</h3>
        <Link to="/courses" className="nav-link">
          Courses
        </Link>
      </div>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Cohort</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th># of Students</th>
            </tr>
          </thead>
          <tbody>
            { cohortItems }
          </tbody>
        </table>
      </div>
    )
  }

}

export default Cohorts;
