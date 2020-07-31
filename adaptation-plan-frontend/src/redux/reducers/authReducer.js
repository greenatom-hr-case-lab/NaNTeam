import { FETCH_AUTH_FAILURE, FETCH_AUTH_REQUEST, FETCH_AUTH_SUCCESS, DELETE_AUTH_TOKEN } from "../actions/types";

const initialState = {
  loading: false,
  token: '',
  user: '',
  error: ''
}

export const authReducer = (state = initialState, action) => {
  console.log('authReducer')
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
      console.log(action.payload.token)
      console.log(action.payload.user)
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user
    }
    case DELETE_AUTH_TOKEN:
      return {
        loading: false,
        token: '',
        user: '',
        error: ''
      }
    default:
      return state
  }
}