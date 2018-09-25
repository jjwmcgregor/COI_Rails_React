import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';


class CohortItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      cohort: props.cohort,
      course: ''
    }

    this.getCourse(this.props.cohort.course_id);

  }

  getCourse(cohortCourseID){
    const id = parseInt(cohortCourseID, 10);
    axios
      .get(
        `/courses/${id}`,
        {
          headers: {
            "Authorization": localStorage.getItem('id_token')
          }
        })
      .then(res => {
        this.setState({
          course: res.data.name
        })
      })
      .catch(err => console.log(err))
  }

  render(){
    return (
      <tr>
        <td >
          <Link to={ `/courses/${this.props.cohort.course_id}/cohorts/${this.props.cohort.id}` }>
            { this.state.course } { this.props.cohort.iteration }
          </Link>
        </td>
        <td>
          { moment(this.props.cohort.start_date).format("ll") }
        </td>
        <td>
          { moment(this.props.cohort.end_date).format("ll") }
        </td>
      </tr>
    )
  }
}

CohortItem.propTypes = {
  cohort: PropTypes.object
}

export default CohortItem;
