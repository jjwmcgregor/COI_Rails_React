import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class ShowCourse extends Component{
  constructor(props){
    super(props);
    this.state = {
      course:''
    }
  }

  componentWillMount(){
    this.getCourse();
  }

  getCourse(){
    let courseID = this.props.match.params.id;
    const header = {
      headers: {
        "Authorization": localStorage.getItem('id_token')
      }
    }

    axios
      .get(`/courses/${courseID}`,header)
      .then(data => {
        this.setState({
          course: data.data
        })
      })
      .catch(err => console.log(err)
    )}


  render(){
    return (
     <div className="container">
       <header className="d-flex pt-3 justify-content-between">
         <Link to="/courses"  className="nav-link">
           Back
         </Link>
        <h2 className="">{ this.state.course.name } </h2>
        <Link to={`/courses/${this.state.course.id}/edit`}  className="nav-link">
          Edit
        </Link>
      </header>
     </div>
    )
  }
}

export default ShowCourse;
