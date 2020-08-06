import axios from "axios";
import {
  FETCH_UPDATE_PLAN_REQUEST,
  FETCH_UPDATE_PLAN_SUCCESS,
  FETCH_UPDATE_PLAN_FAILURE
} from "./types"


const fetchUpdatePlan = () => {
  return {
    type: FETCH_UPDATE_PLAN_REQUEST
  }
}

const fetchUpdatePlanFailure = error => {
  return {
    type: FETCH_UPDATE_PLAN_FAILURE,
    payload: error
  }
}

const fetchUpdatePlanSuccess = plan => {
  return {
    type: FETCH_UPDATE_PLAN_SUCCESS,
    payload: plan
  }
}

//action creator where we got data from server
export function updatePlan(object, token) {
  console.log("updatePlan")
  return (dispatch) => {
    dispatch(fetchUpdatePlan())
    axios
      .post("/plan/updatePlan", object ,{
        headers: {
          authorization: token
    }})
      .then(response => {
        console.log(response.data)
        dispatch(fetchUpdatePlanSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchUpdatePlanFailure(error))
      });
  }
}
  
export function updateStage(object, token) {
  console.log("updateStage")
  return (dispatch) => {
    dispatch(fetchUpdatePlan())
    axios
      .post("/plan/updateStage", object ,{
        headers: {
          authorization: token
    }})
      .then(response => {
        console.log(response.data)
        dispatch(fetchUpdatePlanSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchUpdatePlanFailure(error))
      });
  }
}

export function addNewTask(object, token) {
  console.log("addNewTask")
  return (dispatch) => {
    dispatch(fetchUpdatePlan())
    axios
      .post("/plan/addTask",  object ,{
        headers: {
          authorization: token
    }})
      .then(response => {
        console.log(response.data)
        dispatch(fetchUpdatePlanSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchUpdatePlanFailure(error))
      });
  }
}

export function deleteTask(object, token) {
  console.log("deleteTask")
  return (dispatch) => {
    dispatch(fetchUpdatePlan())
    axios
      .post("/plan/deleteTask",  object ,{
        headers: {
          authorization: token
    }})
      .then(response => {
        console.log(response.data)
        dispatch(fetchUpdatePlanSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchUpdatePlanFailure(error))
      });
  }
}

export function getPlanCurrentEmployee(object, token) {
  console.log("getPlanCurrentEmployee")
  return (dispatch) => {
    dispatch(fetchUpdatePlan())
    axios
      .post("/plan/currentEmployee",  object , {
        headers: {
          authorization: token
        }
      })
      .then(response => {
        console.log(response.data)
        dispatch(fetchUpdatePlanSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchUpdatePlanFailure(error))
      });
  }
}

export function updatePlanTask(object, token) {
  console.log("updatePlanTask")
  return (dispatch) => {
    dispatch(fetchUpdatePlan())
    axios
      .post("/plan/updateTask", object ,{
        headers: {
          authorization: token
        }})
      .then(response => {
        console.log(response.data)
        dispatch(fetchUpdatePlanSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchUpdatePlanFailure(error))
      });
  }
}

export function getPlan(token) {
  console.log("getPlan")
  return (dispatch) => {
    dispatch(fetchUpdatePlan())
    axios
      .post("/plan", {} ,{
        headers: {
          authorization: token
    }})
      .then(response =>
        dispatch(fetchUpdatePlanSuccess(response.data))
      )
      .catch(
        error => dispatch(fetchUpdatePlanFailure(error))
      );
  }
}