import { combineReducers } from 'redux';
import { profileReducer } from './profileReducer';
import { authReducer } from './authReducer'
import { adaptationPlanReducer } from './adaptationPlanReducer'
import { employeesPlanReducer } from './employeesPlanReducer'

const rootReducer = combineReducers({
  profileReducer,
  authReducer,
  adaptationPlanReducer,
  employeesPlanReducer
})

export default rootReducer;