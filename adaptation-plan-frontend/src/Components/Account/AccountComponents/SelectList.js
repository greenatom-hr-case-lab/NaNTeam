import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import '../AccountStyles/SelectList.css'
import {getEmployees} from "../../../redux/actions/employeesPlan";
import {getPlanCurrentEmployee} from "../../../redux/actions/adaptationPlan";
import {connect} from "react-redux";

function SelectList(props) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const startValue = { label: 'Выберите..', value: ''}
  console.log('selectlist')
  useEffect(() => {
    props.getEmployees({token: props.token})
  }, [])
/*
  const groupedOptions = [
    {id: 1, label: 'Дмитрий Хотин', value: 'Дмитрий Хотин'},
    {id: 2, label: 'Александр Пушкин', value: 'Александр Пушкин'}
  ]
*/
  
  const [options, setOptions] = useState(
    props.employees.map((employee, index) => {
      return {
        id: employee._id, label: employee.name, value: index
      }
    })
  )
  
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
  
  const onChange = (newValue) => {
    console.log(newValue)
    props.updateStage()
    props.planCurrentEmployee({token: token, payload: {_id: newValue.id}})
  }
  
  if (props.employees)
    return (
      <div className='selectList'>
        {/*  <Select
          defaultValue={''}
           options={options}
          theme={customTheme}
          onChange={onChange}
        />*/}
        <AsyncSelect
          defaultValue={startValue}
          defaultOptions={options}
          onChange={onChange}
          theme={customTheme}
        />
      </div>
    )
  else
    return (<div>Loading...</div>)
}

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    employees: state.employeesPlanReducer.employees,
    plan: state.adaptationPlanReducer.plan,
  }
}
const mapDispatchToProps = (dispatch, object) => {
  return {
    getEmployees: (object) => dispatch(getEmployees(object.token)),
    planCurrentEmployee: (object) => dispatch(getPlanCurrentEmployee(object.payload, object.token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectList)