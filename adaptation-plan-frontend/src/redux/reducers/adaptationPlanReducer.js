import {
  DELETE_AUTH_TOKEN,
  FETCH_UPDATE_PLAN
} from '../actions/types'

const initialState = {
  plan: ''
}

export const adaptationPlanReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_UPDATE_PLAN:
      console.log("FETCH_UPDATE_PLAN")
      console.log(state)
      return {
        ...state,
        plan: action.payload
      }
    case DELETE_AUTH_TOKEN:
      return {
        plan: ''
      }
    default:
      return state
  }
}
