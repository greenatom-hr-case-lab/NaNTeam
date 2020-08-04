import { FETCH_AUTH_FAILURE, FETCH_AUTH_REQUEST, FETCH_AUTH_SUCCESS, DELETE_AUTH_TOKEN } from "../actions/types";

const initialState = {
  loading: false,
  token: '',
  error: ''
}

export const authReducer = (state = initialState, action) => {
  console.log('authReducer', state)
  switch (action.type) {
    case FETCH_AUTH_REQUEST:
      console.log('FETCH_AUTH_REQUEST')
      return {
        ...state,
        loading: true,
    }
    case FETCH_AUTH_FAILURE:
      console.log('FETCH_AUTH_FAILURE')
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case FETCH_AUTH_SUCCESS:
      console.log('FETCH_AUTH_SUCCESS')
      return {
        ...state,
        loading: false,
        token: action.payload.token,
    }
    case DELETE_AUTH_TOKEN:
      return {
        loading: false,
        token: '',
        error: ''
      }
    default:
      return state
  }
}