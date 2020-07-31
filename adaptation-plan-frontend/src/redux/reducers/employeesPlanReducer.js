import {
  DELETE_AUTH_TOKEN,
  FETCH_PLAN_DIRECTORS,
  FETCH_PLAN_EMPLOYEES
} from '../actions/types'

const initialState = {
  loading: false,
  employees: '',
  error: '',
  directors: ''
}

export const employeesPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAN_DIRECTORS:
      console.log('directors', action.payload)
      return {
        ...state,
        directors: action.payload
      }
    case FETCH_PLAN_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      }
    case DELETE_AUTH_TOKEN:
      return {
        loading: false,
        employees: '',
        error: '',
        directors: ''
      }
    default:
      return state
  }
}