import {
  FETCH_UPDATE_PLAN_REQUEST,
  FETCH_UPDATE_PLAN_SUCCESS,
  FETCH_UPDATE_PLAN_FAILURE
} from '../actions/types'

const initialState = {
  plan: '',
  loading: false,
  error: ''
}

export const adaptationPlanReducer = (state = initialState, action) => {
  console.log('adaptationPlanReducer', state)
  switch(action.type) {
    case FETCH_UPDATE_PLAN_REQUEST:
      console.log("FETCH_UPDATE_PLAN_REQUEST")
      console.log(state)
      return {
        ...state,
        loading: true,
      }
    case FETCH_UPDATE_PLAN_SUCCESS:
      console.log("FETCH_UPDATE_PLAN_SUCCESS")
      console.log(state)
      return {
        ...state,
        loading: false,
        plan: action.payload,
      }
    case FETCH_UPDATE_PLAN_FAILURE:
      console.log("FETCH_UPDATE_PLAN_FAILURE")
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
