import React, {createRef, useState} from 'react';
import './Task.css'
import CalendarField from "../CalendarField";
import {updatePlanTask, deleteTask} from '../../../../redux/actions/adaptationPlan'
import {connect} from "react-redux";

function Task(props) {
  const [field, setField] = useState([
    {id: 1, name: 'Начало задачи', disabled: true},
    {id: 2, name: 'Конец задачи', disabled: true}
  ])
  
  const [taskPeriodStart, setTaskPeriodStart] = useState(props.task.taskPeriodStart ? props.task.taskPeriodStart : '')
  const [taskPeriodEnd, setTaskPeriodEnd] = useState(props.task.taskPeriodEnd ? props.task.taskPeriodEnd : '')

  let resultTask = createRef()
  let taskTitle = createRef()
  let bodyTask = createRef()
  
  const disabled = !(props.user.role === 'Сотрудник' && (props.plan.stage === 'Заполнение сотрудником' || props.plan.stage === 'Выполнение') ||
    props.user.role === 'HR-сотрудник' && (props.plan.stage === 'Согласование руководителем' || props.plan.stage === 'Оценка руководителем') ||
    props.user.role === 'Руководитель' && (props.plan.stage === 'Согласование руководителем' || props.plan.stage === 'Оценка руководителем' || props.plan.stage === 'Заполнение сотрудником' || props.plan.stage === 'Выполнение'))
  
  const updatePlan = () => {
    if (
      taskPeriodStart &&
      taskPeriodEnd &&
      taskTitle.current.value &&
      bodyTask.current.value
    ) props.updateTask({ token: props.token, task: {
        index: props.index,
        _id: props.plan._id,
        resultTask: resultTask.current.checked,
        taskTitle: taskTitle.current.value,
        bodyTask: bodyTask.current.value,
        taskPeriodStart: taskPeriodStart,
        taskPeriodEnd: taskPeriodEnd
      }})
  }
  
  const updateTaskPeriodStart = (value) => {
    setTaskPeriodStart(value)
    updatePlan()
  }
  const updateTaskPeriodEnd = (value) => {
    setTaskPeriodEnd(value)
    updatePlan()
  }
  const deleteTask = () => {
    props.deleteTask({token: props.token, payload: {_id: props.plan._id, index: props.index}})
  }
  return (
    <div className='task'>
      <div className="taskTitle">
        <input type='checkbox'
               className="checkBox"
               defaultChecked={props.task.resultTask}
               disabled={disabled}
               ref={resultTask}
               onBlur={updatePlan}/>
        <input type='text'
               className="taskSubTitle"
               placeholder='Введите название задачи..'
               maxLength='80'
               defaultValue={props.task.title ? props.task.title : ''}
               disabled={disabled}
               ref={taskTitle}
               onBlur={updatePlan}/>
        <button className="deleteTask" onClick={deleteTask} disabled={disabled}/>
      </div>
      <div className="taskPeriod">
        <CalendarField title={field[0]}
                       value={taskPeriodStart}
                       disabled={disabled}
                       update={updateTaskPeriodStart}/>
      </div>
      <div className="taskPeriod">
        <CalendarField title={field[1]}
                       value={taskPeriodEnd}
                       disabled={disabled}
                       update={updateTaskPeriodEnd}/>
      </div>
      <textarea className="taskText"
                defaultValue={props.task.bodyTask ? props.task.bodyTask : ''}
                disabled={disabled}
                ref={bodyTask}
                onBlur={updatePlan}/>
      <p className="taskDate">Дата создания: {props.plan.position ? props.plan.position : ''}</p>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    plan: state.adaptationPlanReducer.plan,
    user: state.authReducer.user
  }
}
const mapDispatchToProps = (dispatch, object) => {
  return {
    updateTask: (object) => dispatch(updatePlanTask(object.task, object.token)),
    deleteTask: (object) => dispatch(deleteTask(object.payload, object.token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
