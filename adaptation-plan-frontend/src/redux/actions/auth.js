import axios from 'axios'
import { FETCH_AUTH_FAILURE, FETCH_AUTH_SUCCESS, FETCH_AUTH_REQUEST, DELETE_AUTH_TOKEN } from "./types";

const fetchAuth = () => {
  return {
    type: FETCH_AUTH_REQUEST
  }
}

const fetchAuthFailure = error => {
  return {
    type: FETCH_AUTH_FAILURE,
    payload: error
  }
}

const fetchAuthSuccess = data => {
  return {
    type: FETCH_AUTH_SUCCESS,
    payload: data
  }
}

const deleteAuthToken = () => {
  return {
    type: DELETE_AUTH_TOKEN
  }
}

export function authFetchData(object) {
  return (dispatch) => {
    dispatch(fetchAuth())
    axios.post("/signin", object)
      .then(response => {
        localStorage.setItem('token', response.data.token)
        dispatch(fetchAuthSuccess(response.data))
      })
      .catch(error =>
        dispatch(fetchAuthFailure(  error.message))
      )
  }
}

export function deleteSession() {
  return (dispatch) => {
    dispatch(deleteAuthToken())
    localStorage.removeItem('token')
  }
}