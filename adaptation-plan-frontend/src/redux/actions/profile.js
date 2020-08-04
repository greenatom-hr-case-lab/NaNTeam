import axios from "axios";
import {FETCH_PROFILE_REQUEST, FETCH_PROFILE_FAILURE, FETCH_PROFILE_SUCCESS} from "./types"

// when loading
const fetchProfile = () => {
  return {
    type: FETCH_PROFILE_REQUEST
  }
}

//loaded success
const fetchProfileSuccess = profile => {
  return {
    type: FETCH_PROFILE_SUCCESS,
    payload: profile
  }
}

//get error
const fetchProfileFailure = error => {
  return {
    type: FETCH_PROFILE_FAILURE,
    payload: error
  }
}

//action creator where we got data from server
export function profileFetchData(object) {
  return (dispatch) => {
    dispatch(fetchProfile())
    axios
      .post("/profile",{},{
        headers: {
          authorization: object.token
    }})
      .then(response => {
        dispatch(fetchProfileSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchProfileFailure(error))
      });
  }
}
