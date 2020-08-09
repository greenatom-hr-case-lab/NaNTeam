import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import '../AccountStyles/SelectList.css'
import {getEmployees} from "../../../redux/actions/employeesPlan";
import {getPlanCurrentEmployee} from "../../../redux/actions/adaptationPlan";
import {connect} from "react-redux";
import Loader from "./Loader";

function SelectList(props) {
  const [token] = useState(localStorage.getItem('token'))
  const startValue = { label: 'Выберите..', value: ''}
/*  let startValue
  if (props.fioEmployee)
    startValue = {label: props.fioEmployee, value: ''}
  else
    startValue = { label: 'Выберите..', value: ''}*/
  const [options, setOptions] = useState(
    {label: 'Загрузка...', value: 'Загрузка...'}
  )
  useEffect(() => {
    if (props.employees)
      setOptions(props.employees.map((employee, index) => {
        return {
          id: employee._id, label: employee.name, value: index
        }
      }))
  }, [props.employees])
  
  const customTheme = theme => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: '#f8fcfe',
        primary: '#bed52d'
      },
    }
  }
  
  function onChange(newValue) {
    props.setfioEmployee(newValue)
    props.planCurrentEmployee({token: token, payload: {_id: newValue.id}})
  }
  
  return (
    <div className='selectList'>
      <AsyncSelect
        defaultValue={startValue}
        defaultOptions={options}
        onChange={onChange}
        theme={customTheme}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    employees: state.employeesPlanReducer.employees,
    plan: state.adaptationPlanReducer.plan,
    loadingEmployees: state.employeesPlanReducer.loading,
    loadingPlan: state.adaptationPlanReducer.loadingPlan
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getEmployees: (object) => dispatch(getEmployees(object.token)),
    planCurrentEmployee: (object) => dispatch(getPlanCurrentEmployee(object.payload, object.token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectList)