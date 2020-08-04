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
import Loader from "../Loader";

function Plan(props) {

  const [token, setToken] = useState(localStorage.getItem('token'))
  const [stage, setStage] = useState('Подготовка')
  const addTask = () => {
    props.addTask({token: token, payload: {_id: props.plan._id}})
  }
  const createPlan = () => {
    setStage('Создание плана')
  }
  const beginPlan = () => {
    setStage('Начало')
  }
  
  useEffect(() => {
/*    props.getDirectors({token: token})
    props.getEmployees({token: token})*/
    console.log('props.profile', props.profile)
    if (props.profile.role === 'Сотрудник') {
      props.fetchPlan({token: token})
    }
  }, [])
  
//  ------------------------------------------------------------
  if (token){
/*    console.log('СПИСОК --------------------внутри')
    console.log('props.plan', props.plan)
    console.log('props.profile.role', props.profile.role)
    console.log('props.employees', props.employees)
    console.log('props.directors', props.directors)*/
    if (props.loadingPlan)
      return <Loader/>
    else {
      if (props.profile.role === "HR-Сотрудник") {
        return (
          <div className="plan">
            <div className="tasks">
              <div className="select">
                <SelectList updateStage={beginPlan}/>
                {props.plan ? ((props.plan.stage === 'Согласование руководителем' || props.plan.stage === 'Выполнение') &&
                  <button className='addTask' onClick={addTask}/>) : ''}
                {(stage === 'Начало' && !props.plan) &&
                <div className="board"><BeginThePlan updateStage={createPlan}/></div>}
              </div>
              {props.plan ? (props.plan.tasks ? props.plan.tasks.forEach((task, index) => {
                return <Task task={task} key={index} index={index}/>
              }) : null) : ''}
            </div>
            {(stage === 'Создание плана' && !props.plan) ? (<div className="structurePlan"><MainInfo/></div>) : ''}
            {(props.plan) ? (<div className="structurePlan"><MainInfo/></div>) : ''}
          </div>
        )
      }
      if (props.profile.role === 'Руководитель') {
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
      if (props.profile.role === 'Сотрудник') {
        console.log('внутри сотрудника')
        if (props.plan)
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
        else return (<div className="action">План пока не создан</div>)
      }
    }
  }
  else
    return <Redirect to="/" />
}

const mapStateToProps = state => {
  console.log('planState', state)
  return {
    plan: state.adaptationPlanReducer.plan,
    profile: state.profileReducer.profile,
    employees: state.employeesPlanReducer.employees,
    directors: state.employeesPlanReducer.directors,
    loadingEmployees: state.employeesPlanReducer.loading,
    loadingPlan: state.adaptationPlanReducer.loading,
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