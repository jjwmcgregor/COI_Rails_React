import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import moment from 'moment';

class ShowCohort extends Component {
  constructor(props){
    super(props);
    this.state = {
      course_id: this.props.match.params.course_id,
      course_name: '',
      cohort_id: this.props.match.params.id,
      cohort: {}
    }

    this.getCohort = this.getCohort.bind(this);
  }

  componentWillMount(){
    this.getCohort();
    this.getCourseName();
  }

  getCourseName(){
    const header = {
      headers: {
        "Authorization": localStorage.getItem('id_token')
      }
    }

    axios
      .get(`/courses/${this.state.course_id}`, header)
      .then(res => {
        this.setState({
          course_name: res.data.name
        })
      })
      .catch(err => console.log(err))
  }

  getCohort(){
    const header = {
      headers: {
        "Authorization": localStorage.getItem('id_token')
      }
    }

    axios
      .get(`/courses/${this.state.course_id}/cohorts/${this.state.cohort_id}`, header)
      .then(res => {
        this.setState({
          cohort: res.data
        });
      })
      .catch(err => console.log(err))
  }

  render(){
    return(
      <div className="container text-center p-2">
        <div className="d-flex py-3 justify-content-between">
          <Link to="/cohorts" className="nav-link">
            Back
          </Link>
          <h3>{ `${this.state.course_name} ${this.state.cohort.iteration}` }</h3>
          <Link to={`/courses/${this.state.course_id}/cohorts/${this.state.cohort_id}/edit`} className="nav-link">
            Edit
          </Link>
        </div>
        <div className="row">
          <div className="col-12">
            <h6>
            { `From ${ moment(this.state.cohort.start_date).format("ll") } to ${ moment(this.state.cohort.end_date).format("ll") }` }
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h6>{ `Trainer - ${this.state.cohort.trainer}` }</h6>
          </div>
        </div>
        <div className="row">
          <table className="table col-6 offset-3">
            <thead>
              <tr>
                <th>Trainees</th>
                <th>Inventory</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    )
  }
}

export default ShowCohort;
