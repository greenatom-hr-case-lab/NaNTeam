import axios from "axios";
import {
  FETCH_UPDATE_PLAN
} from "./types"


const fetchUpdatePlan = plan => {
  return {
    type: FETCH_UPDATE_PLAN,
    payload: plan
  }
}

//action creator where we got data from server
export function updatePlan(object, token) {
  console.log("updatePlan")
  return (dispatch) => {
    axios
      .post("/plan/updatePlan", object ,{
        headers: {
          authorization: token
    }})
      .then(response => {
        console.log(response.data)
        dispatch(fetchUpdatePlan(response.data))
      })
      .catch(error => {
        console.log(error)
      });
  }
}
  
export function updateStage(object, token) {
  console.log("updateStage")
  return (dispatch) => {
    axios
      .post("/plan/updateStage", object ,{
        headers: {
          authorization: token
    }})
      .then(response => {
        console.log(response.data)
        dispatch(fetchUpdatePlan(response.data))
      })
      .catch(error => {
        console.log(error)
      });
  }
}

export function addNewTask(object, token) {
  console.log("addNewTask")
  return (dispatch) => {
    axios
      .post("/plan/addTask",  object ,{
        headers: {
          authorization: token
    }})
      .then(response => {
        console.log(response.data)
        dispatch(fetchUpdatePlan(response.data))
      })
      .catch(error => {
        console.log(error)
      });
  }
}

export function deleteTask(object, token) {
  console.log("deleteTask")
  return (dispatch) => {
    axios
      .post("/plan/deleteTask",  object ,{
        headers: {
          authorization: token
    }})
      .then(response => {
        console.log(response.data)
        dispatch(fetchUpdatePlan(response.data))
      })
      .catch(error => {
        console.log(error)
      });
  }
}

export function getPlanCurrentEmployee(object, token) {
  console.log("getPlanCurrentEmployee")
  return (dispatch) => {
    axios
      .post("/plan/currentEmployee",  object , {
        headers: {
          authorization: token
    }})
      .then(response => {
        console.log(response.data)
        dispatch(fetchUpdatePlan(response.data))
      })
      .catch(error => {
        console.log(error)
      });
  }
}

export function updatePlanTask(object, token) {
  console.log("updatePlanTask")
  return (dispatch) => {
    axios
      .post("/plan/updateTask", object ,{
        headers: {
          authorization: token
        }})
      .then(response => {
        console.log(response.data)
        dispatch(fetchUpdatePlan(response.data))
      })
      .catch(error => {
        console.log(error)
      });
  }
}

export function getPlan(token) {
  console.log("getPlan")
  return (dispatch) => {
    axios
      .post("/plan", {} ,{
        headers: {
          authorization: token
    }})
      .then(response => {
        console.log(response.data)
        dispatch(fetchUpdatePlan(response.data))
      })
      .catch(error => {
        console.log(error)
      });
  }
}