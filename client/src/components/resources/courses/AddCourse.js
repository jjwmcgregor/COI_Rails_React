import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AddCourse extends Component {

  addCourse(newCourse){
    axios.request({
      method:'post',
      url:'/courses',
      headers: {
        "Authorization": localStorage.getItem('id_token')
      },
      data: newCourse
    }).then(res => {
      console.log(res);
      // this.props.history.push('/courses');
    }).catch(err => console.log(err));
  }

  onSubmit(e){
    e.preventDefault();
    const newCourse = {
      name: this.refs.name.value
    }
    console.log(newCourse);
    this.addCourse(newCourse);
  }

  onChange(){

  }

  render(){
    return(
      <div className="container">
        <div className="d-flex pt-3 justify-content-between">
          <Link to="/courses" className="nav-link">
            Back
          </Link>
          <h3>Add Course</h3>
          <Link to="/cohorts" className="nav-link">
            Cohorts
          </Link>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card card-container">
              <form className="form-signin"  onSubmit={this.onSubmit.bind(this)}>
                <span id="reauth-email" className="reauth-email"></span>
                  <input
                    id="inputEmail"
                    type="text"
                    className="form-control"
                    placeholder="Course name"
                    name="name"
                    ref="name"
                    required
                  />
                  <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Add a course</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
  }

}

export default AddCourse;
