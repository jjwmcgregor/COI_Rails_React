import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class EditCourse extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: ''
    }

    this.onChange = this.onChange.bind(this);

  }

  componentWillMount(){
    this.getCourse();
  }

  getCourse(){
    let courseID = this.props.match.params.id;
    axios
      .get(
        `/courses/${courseID}`,
        {
          headers: {
            "Authorization": localStorage.getItem('id_token')
          }
        }
      )
      .then(res => {
        this.setState({
          id: res.data.id,
          name: res.data.name
        })
      })
      .catch(err => console.log(err))
  }

  editCourse(newCourse){
    axios
      .request({
        method:'put',
        url:`/courses/${this.state.id}`,
        data: newCourse,
        headers: {
          "Authorization": localStorage.getItem('id_token')
        }
      })
      .then(response => {
        this.props.history.push('/courses');
      })
      .catch(err => console.log(err));
  }

  onSubmit(e){
    e.preventDefault();
    const newCourse = {
      name: this.refs.name.value
    }
    this.editCourse(newCourse);
    // console.log(newCourse);
  }

  onChange(e){
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  render(){
    return(
      <div className="container">
        <div className="d-flex pt-3 justify-content-between">
          <Link to="/courses" className="nav-link">
            Back
          </Link>
          <h3>Edit Course</h3>
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
                    value={this.state.name}
                    onChange={this.onChange}
                    name="name"
                    ref="name"
                    required
                  />
                  <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
  }

}

export default EditCourse;
