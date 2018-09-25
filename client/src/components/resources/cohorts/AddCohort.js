import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class AddCohort extends Component {
  constructor(){
    super();
    this.state = {
      stream: '',
      iteration: null,
      start_date: '',
      end_date: '',
      courses: []
    }

    this.onChange = this.onChange.bind(this);
    this.getCourses = this.getCourses.bind(this);
  }

  componentWillMount(){
    this.getCourses();
  }

  onChange(e){
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    })
  }

  addCohort(newCohort){
    axios.request({
      method:'post',
      url:'/cohorts',
      headers: {
        "Authorization": localStorage.getItem('id_token')
      },
      data: newCohort
    }).then(res => {
      this.props.history.push('/cohorts');
    }).catch(err => console.log(err));
  }

  onSubmit(e){
    e.preventDefault();
    const newCohort = {
      course_id: parseInt(this.refs.stream.value, 10),
      iteration: parseInt(this.refs.iteration.value, 10),
      start_date: this.refs.start_date.value,
      end_date: this.refs.end_date.value
    }
    console.log(newCohort);
    this.addCohort(newCohort);
  }

  getCourses(){
    const header = {
      headers: {
        "Authorization": localStorage.getItem('id_token')
      }
    }

    axios
      .get(
        '/courses',
        header)
      .then(data =>
        this.setState({
          courses: data.data
        }))
      .catch(err =>
        this.setState({
          errors: err
        }));
  }

  render(){
    // Select streams from list of courses
    let courses;
    if (this.state.courses) {
      courses = this.state.courses.map(course => {
        return(
          <option
            key={ `${course.name}_${course.id}` }
            value={ course.id }
            ref={ course.id }
          >
            { course.name }
          </option>
        )
      });
    }

    return(
      <div className="container text-center">
        <div className="d-flex pt-3 justify-content-between">
          <Link to="/cohorts" className="nav-link">
            Back
          </Link>
          <h3>Add Cohort</h3>
          <Link to="/courses" className="nav-link">
            Courses
          </Link>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card card-container">
              <br />
              <form className="form-signin" onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group row">
                  <select className="form-control col-8" ref="stream">
                    { courses }
                  </select>
                  <input
                    ref="iteration"
                    id=""
                    type="number"
                    className="form-control col-4"
                    name="iteration"
                    placeholder="1"
                    min="1"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group row d-flex">
                  <input type="date" ref="start_date" className="col-6 form-control"></input>
                  <input type="date" ref="end_date" className="col-6 form-control"></input>
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

export default AddCohort;
