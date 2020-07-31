import axios from 'axios'
import { FETCH_PLAN_EMPLOYEES, FETCH_PLAN_DIRECTORS } from './types'

const fetchPlanEmployees = (employees) => {
  return {
    type: FETCH_PLAN_EMPLOYEES,
    payload: employees
  }
}

const fetchPlanDirectors = (directors) => {
  return {
    type: FETCH_PLAN_DIRECTORS,
    payload: directors
  }
}

export function getDirectors(token) {
  return (dispatch) => {
    axios
      .post('/plan/directors', {} ,{
        headers: {
          authorization: token
    }})
      .then(response => dispatch(fetchPlanDirectors(response.data)))
      .catch( error => console.log(error))
  }
}

export function getEmployees(token) {
  return (dispatch) => {
    axios
      .post('/plan', {} ,{
        headers: {
          authorization: token
    }})
      .then(response => dispatch(fetchPlanEmployees(response.data)))
      .catch( error => console.log(error))
  }
}
