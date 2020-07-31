import React, {useState, useEffect, createRef, useLayoutEffect} from 'react';
import { connect } from 'react-redux'
import {Redirect} from "react-router-dom";
import './Plan.css';
import SelectList from "../SelectList";
import {addNewTask, getPlan} from "../../../../redux/actions/adaptationPlan";

import BeginThePlan from "./BeginThePlan";
import MainInfo from "./MainInfo";
import Task from "./Task";
import {getDirectors, getEmployees} from "../../../../redux/actions/employeesPlan";

function Plan(props) {

  const [token, setToken] = useState(localStorage.getItem('token'))
  console.log('localStorage', token)
  const [stage, setStage] = useState('Подготовка')
  console.log('role Plan.js', props.user.role)
  const addTask = () => {
    props.addTask({token: props.token, payload: {_id: props.plan._id}})
  }
  const createPlan = () => {
    setStage('Создание плана')
  }
  const beginPlan = () => {
    setStage('Начало')
  }
  
  useEffect(() => {
    console.log('//---------------------------------------------------------------------------------------------')
    props.getDirectors({token: token})
    props.getEmployees({token: token})
    if (props.user.role === 'Сотрудник') {
      props.fetchPlan({token: props.token})
      console.log('Сотрудник')
      console.log('СПИСОК ------------------------')
      console.log('props.token', props.token)
      console.log('props.plan', props.plan)
      console.log('props.user', props.user)
      console.log('props.employees', props.employees)
      console.log('props.directors', props.directors)
    }
  }, [])
  
//  ------------------------------------------------------------
  if (token){
    console.log('СПИСОК --------------------внутри')
    console.log('props.token', props.token)
    console.log('props.plan', props.plan)
    console.log('props.user.role', props.user.role)
    console.log('props.employees', props.employees)
    console.log('props.directors', props.directors)
  if (props.user.role === "HR-Сотрудник") {
    if (props.employees)
    return (
      <div className="plan">
        <div className="tasks">
          <div className="select">
            <SelectList updateStage={beginPlan}/>
            {props.plan ? ((props.plan.stage === 'Согласование руководителем' || props.plan.stage === 'Выполнение') &&
            <button className='addTask' onClick={addTask}/>) : ''}
            {(stage === 'Начало' && !props.plan) && <div className="board"><BeginThePlan updateStage={createPlan}/></div>}
          </div>
          {props.plan ? (props.plan.tasks ? props.plan.tasks.forEach((task, index) => {
            return <Task task={task} key={index} index={index}/>
          }) : null) : ''}
        </div>
        {(stage === 'Создание плана' && !props.plan) ? (<div className="structurePlan"><MainInfo/></div>) : ''}
        {(props.plan) ? (<div className="structurePlan"><MainInfo/></div>) : ''}
      </div>
    )
    else return (<div>loading...</div>)
  }
  if (props.user.role === 'Руководитель') {
    return (
      <div className="plan">
        <div className="tasks">
          <div className="select">
            <SelectList/>
            {props.plan.stage === 'Согласование руководителем' && <button className='addTask' onClick={addTask}/>}
            {(props.plan.stage === 'Начало') && <div>План еще не создан сотрудником кадровой службы!</div>}
          </div>
          {props.plan.tasks ? props.plan.tasks.forEach((task, index) => {
            return <Task task={task} key={index} index={index}/>
          }) : null}
        </div>
        {(props.plan.stage !== 'Начало' && props.plan.stage !== undefined) &&
        <div className="structurePlan"><MainInfo/></div>}
      </div>
    )
  }
  if (props.user.role === 'Сотрудник') {
    console.log('внутри сотрудника')
    return (
      <div className="plan">
        <div className="tasksEmployee">
          {props.plan.tasks ? props.plan.tasks.forEach((task, index) => {
            return <Task task={task} key={index} index={index}/>
          }) : null}
          {(!props.plan.stage) && <div className="action">План еще не создан сотрудником кадровой службы!</div>}
          {(props.plan.stage === 'Заполнение сотрудником' || props.plan.stage === 'Выполнение') &&
          (<div className='addTaskEmployee'>
            <button className='addTask' onClick={addTask}/>
          </div>)}
        </div>
        {(props.plan.stage !== 'Начало' && props.plan.stage !== undefined) &&
        <div className="structurePlan"><MainInfo/></div>}
      </div>
    )
  }
}
  else
    return <Redirect to="/" />
}

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    plan: state.adaptationPlanReducer.plan,
    user: state.authReducer.user,
    employees: state.employeesPlanReducer.employees,
    directors: state.employeesPlanReducer.directors
  }
}
const mapDispatchToProps = (dispatch, object) => {
  return {
    addTask: (object) => dispatch(addNewTask(object.payload, object.token)),
    fetchPlan: (object) => dispatch(getPlan(object.token)),
    getDirectors: (object) => dispatch(getDirectors(object.token)),
    getEmployees: (object) => dispatch(getEmployees(object.token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan)