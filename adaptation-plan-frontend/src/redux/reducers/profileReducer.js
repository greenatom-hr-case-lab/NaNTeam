import {FETCH_PROFILE_REQUEST, FETCH_PROFILE_FAILURE, FETCH_PROFILE_SUCCESS, DELETE_AUTH_TOKEN} from '../actions/types'

const initialState = {
  loading: false,
  profile: '',
  error: ''
}

export const profileReducer = (state = initialState, action) => {
  console.log('profileReducer', state)
  switch(action.type) {
    case FETCH_PROFILE_REQUEST:
      console.log("FETCH_PROFILE_REQUEST")
      return {
        ...state,
        loading: true,
      }
    case FETCH_PROFILE_SUCCESS:
      console.log("FETCH_PROFILE_SUCCESS")
      return {
        ...state,
        loading: false,
        profile: action.payload,
      }
    case FETCH_PROFILE_FAILURE:
      console.log("FETCH_PROFILE_FAILURE")
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DELETE_AUTH_TOKEN:
      return {
        loading: false,
        profile: '',
        error: ''
      }
    default:
      return state
  }
}
