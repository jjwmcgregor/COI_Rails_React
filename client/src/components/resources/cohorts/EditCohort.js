import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class EditCohort extends Component {
  constructor(props){
    super(props);
    this.state = {
      course_id: this.props.match.params.course_id,
      course_name: '',
      courses: [],
      cohort_id: this.props.match.params.id,
      cohort: {}
    }

  }

  componentWillMount(){
    this.getCohort();
    this.getCourses();
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

  getCourses(){
    const header = {
      headers: {
        "Authorization": localStorage.getItem('id_token')
      }
    }
    axios
      .get(`/courses`, header)
      .then(res => {
        this.setState({
          courses: res.data
        })
      })
      .catch(err => console.log(err))
  }

  onSubmit(e){
    e.preventDefault();

    const newCohort = {
      course_id: this.refs.course_id.value,
      iteration: this.refs.iteration.value,
      start_date: this.refs.start_date.value,
      end_date: this.refs.end_date.value,
    }

    this.editCourse(newCohort);
  }

  onChange(e){
    const value = e.target.value;
    const name = e.target.name;
    // console.log(`Name: ${name}, Value: ${value}`);
    this.setState({
      [name]: value
    });
  }


  editCourse(newCohort){
    axios
      .request({
        method:'put',
        url:`/courses/${this.props.match.params.course_id}/cohorts/${this.state.cohort_id}`,
        data: newCohort,
        headers: {
          "Authorization": localStorage.getItem('id_token')
        }
      })
      .then(response => {
        this.props.history.push('/cohorts');
      })
      .catch(err => console.log(err));
  }

  render(){
    // Select course_ids from list of courses
    let courses;
    if (this.state.courses) {
      courses = this.state.courses.map(course => {
        return(
          <option
            key={ `${course.name}_${course.id}` }
            ref={ course.id }
          >
            { course.name }
          </option>
        )
      });
    }

    return(
      <div className="container">
        <div className="d-flex pt-3 justify-content-between">
          <Link to={`/courses/${this.state.course_id}/cohorts/${this.state.cohort_id}`} className="nav-link">
            Back
          </Link>
          <h3>Edit { `${this.state.course_name} ${this.state.cohort.iteration}` }</h3>
          <Link to="/cohorts" className="nav-link">
            Cohorts
          </Link>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card card-container">
              <form className="form-signin" onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group row">
                  <select
                    className="form-control col-7"
                    ref="course_id"
                    name="course_id"
                    defaultValue={this.state.course_name}
                    onChange={this.onChange.bind(this)}
                  >
                    { courses }
                  </select>
                  <input
                    ref="iteration"
                    defaultValue={this.state.cohort.iteration}
                    id=""
                    type="number"
                    className="form-control col-4 offset-1"
                    name="iteration"
                    min="1"
                    onChange={this.onChange.bind(this)}
                    required
                  />
                </div>
                <div className="form-group row d-flex">
                  <label htmlFor="start_date" className="col-form-label col-4">Start</label>
                  <input
                    type="date"
                    ref="start_date"
                    name="start_date"
                    className="col-8 form-control"
                    defaultValue={this.state.cohort.start_date}>
                  </input>
                </div>
                <div className="form-group row d-flex">
                  <label htmlFor="end_date" className="col-form-label col-4">Finish</label>
                  <input
                    type="date"
                    ref="end_date"
                    name="end_date"
                    className="col-8 form-control"
                    defaultValue={this.state.cohort.end_date}>
                  </input>
                </div>
                <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Add a cohort</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditCohort;
