import axios from 'axios'
import {
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
  FETCH_DIRECTORS_SUCCESS,
  FETCH_DIRECTORS_FAILURE
} from './types'

const fetchEmployeesFailure = error => {
  return {
    type: FETCH_EMPLOYEES_FAILURE,
    payload: error
  }
}

const fetchEmployeesSuccess = employees => {
  return {
    type: FETCH_EMPLOYEES_SUCCESS,
    payload: employees
  }
}

const fetchDirectorsFailure = error => {
  return {
    type: FETCH_DIRECTORS_FAILURE,
    payload: error
  }
}

const fetchDirectorsSuccess = directors => {
  return {
    type: FETCH_DIRECTORS_SUCCESS,
    payload: directors
  }
}

const fetchEmployees = () => {
  return {
    type: FETCH_EMPLOYEES
  }
}

export function getDirectors(token) {
  return (dispatch) => {
    dispatch(fetchEmployees())
    axios
      .post('/plan/directors', {} ,{
        headers: {
          authorization: token
    }})
      .then(response => {
        dispatch(fetchDirectorsSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchDirectorsFailure(error))
      });
  }
}

export function getEmployees(token) {
  return (dispatch) => {
    dispatch(fetchEmployees())
    axios
      .post('/plan', {} ,{
        headers: {
          authorization: token
    }})
      .then(response => {
        dispatch(fetchEmployeesSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchEmployeesFailure(error))
      });
  }
}
