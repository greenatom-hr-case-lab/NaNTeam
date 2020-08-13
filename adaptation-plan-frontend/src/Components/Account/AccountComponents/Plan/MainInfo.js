import React, { useEffect, useState} from 'react';
import './MainInfo.css'
import TextField from "../TextField";
import CalendarField from "../CalendarField";
import SelectField from "../SelectField";
import Stage from "./Stage";
import {getDirectors} from "../../../../redux/actions/employeesPlan";
import {connect} from "react-redux";
import {
  updatePlan,
  updateStage
} from "../../../../redux/actions/adaptationPlan";

function MainInfo(props) {
  const date = new Date()
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [field, setField] = useState([
    {id: 1, name: 'Должность'},
    {id: 2, name: 'Руководитель'},
    {id: 3, name: 'Начало'},
    {id: 4, name: 'Конец'},
    {id: 5, name: 'HR-сотрудник'},
    {id: 6, name: 'Оценка'},
    {id: 7, name: 'Результат'}
  ])
  
  const [stage, setStage] = useState([
    {id: 1, name: 'Создание плана', completed: false},
    {id: 2, name: 'Заполнение сотрудником', completed: false},
    {id: 3, name: 'Согласование руководителем', completed: false},
    {id: 4, name: 'Выполнение', completed: false},
    {id: 5, name: 'Оценка руководителем', completed: false},
    {id: 6, name: 'Оценка завершена', completed: false}
  ])
  
  const rating = [
    {_id: 1, name: 'A. Исключительно высокий уровень эффективности', value: 1},
    {_id: 2, name: 'B. Высокий уровень эффективности', value: 2},
    {_id: 3, name: 'C. Уровень соответствия занимаемой должности', value: 3},
    {_id: 4, name: 'D. Уровень эффективности ниже стандартного', value: 4},
    {_id: 5, name: 'E. Неудовлетворительный уровень эффективности', value: 5}
  ]
  
  const sendData = () => {
/*    updatePlan()*/
    if (props.plan) {
      if (props.profile.role === 'Руководитель' && (props.plan.stage === stage[1].name || props.plan.stage === stage[3].name) ||
        props.profile.role === 'HR-Сотрудник' ||
        props.profile.role === 'Сотрудник' && (props.plan.stage === stage[0].name || stage[2].name)) {
        let i = 0
        while (stage[i].completed) {
          i++
        }
/*        setStage(stage.map((stage, index) => {
          if (index === i) stage.completed = true
          return stage
        }))*/
        props.updatePlanStage({token: token, plan: {stage: stage[i].name, _id: props.plan._id}})
      }
    }
  }
  
  useEffect(() => {
    setClick(false)
    let i = 0
    if (props.plan) {
      console.log(props.plan.stage)
      while (stage[i].name !== props.plan.stage) {
        i++
      }
      setStage(stage.map(function(stage, index){
        if (index <= i) stage.completed = true
        return stage
      }))
    }
    console.log(stage)
    props.getDirectors({token: token})
  }, [])
  
  const [position, setPosition] = useState(props.plan ? props.plan.position : null)
  const [directorEmployee, setDirectorEmployee] = useState(props.plan ? props.plan.directorEmployee : null)
  const [adaptationPeriodStart, setAdaptationPeriodStart] = useState(props.plan ? props.plan.adaptationPeriodStart : null)
  const [adaptationPeriodEnd, setAdaptationPeriodEnd] = useState(props.plan ? props.plan.adaptationPeriodEnd : null)
  const [hrEmployee, setHREmployee] = useState(props.plan ? props.plan.hrEmployee.name : props.profile.name)
  const [mark, setMark] = useState(props.plan ? props.plan.mark : null)
  const [click, setClick] = useState('')
  const updatePlan = () => {
    if (
      click &&
      position &&
      directorEmployee &&
      adaptationPeriodStart &&
      adaptationPeriodEnd &&
      hrEmployee
    ) { alert('updatePlanTrue')
      if (!props.plan)
        props.updateAdaptationPlan(
          {
            token: token,
            plan: {
              fioEmployee: props.fioEmployee.id,
              position: position,
              directorEmployee: directorEmployee.id,
              adaptationPeriodStart: adaptationPeriodStart,
              adaptationPeriodEnd: adaptationPeriodEnd,
              hrEmployee: props.profile._id,
              stage: props.plan ? props.plan.stage : stage[0].name,
              mark: mark,
              dateCreate: props.plan ? props.plan.dateCreate : date.toLocaleDateString,
              tasks: [{}]
            }
          })
      else if (props.plan && !mark)
        props.updateAdaptationPlan({
          token: token,
          plan: {
            fioEmployee: props.profile.role === 'Сотрудник' ? props.profile._id : props.fioEmployee.id,
            position: position,
            directorEmployee: directorEmployee.id,
            adaptationPeriodStart: adaptationPeriodStart,
            adaptationPeriodEnd: adaptationPeriodEnd
          }
        })
      else if (props.plan && mark)
        props.updateAdaptationPlan({
          token: token,
          plan: {
            fioEmployee: props.fioEmployee.id,
            position: position,
            directorEmployee: directorEmployee.id,
            adaptationPeriodStart: adaptationPeriodStart,
            adaptationPeriodEnd: adaptationPeriodEnd,
            mark: mark.label,
          }
        })
    }
  }
  
  const updatePosition = (value) => {
    setClick(true)
    setPosition(value)
  }
  const updateDirectorEmployee = (value) => {
    setClick(true)
    setDirectorEmployee(value)
  }
  const updateAdaptationPeriodStart = (value) => {
    setClick(true)
    setAdaptationPeriodStart(value)
  }
  function updateAdaptationPeriodEnd(value) {
    setClick(true)
    setAdaptationPeriodEnd(value)
  }
  const updateMark = (value) => {
    setClick(true)
    setMark(value)
  }
  const disabled = !(props.profile.role === 'HR-Сотрудник' && props.plan.stage !== stage[5].name)
  
  useEffect(() => {
    updatePlan()
  }, [position, directorEmployee, adaptationPeriodStart, adaptationPeriodEnd, hrEmployee, mark])
  
  return (
    <div className="mainInfo">
      <p>Дата создания плана: {props.plan ? props.plan.dateCreate : date.toLocaleDateString()}</p>
      <TextField title={field[0]} disabled={ disabled } update={updatePosition} value={position} />
      <SelectField title={field[1]} disabled={ disabled } options={props.directors ? props.directors : []} update={updateDirectorEmployee} value={directorEmployee ? directorEmployee.name : directorEmployee} />
      <CalendarField title={field[2]} disabled={ disabled } update={updateAdaptationPeriodStart} value={adaptationPeriodStart}/>
      <CalendarField title={field[3]} disabled={ disabled } update={updateAdaptationPeriodEnd} value={adaptationPeriodEnd}/>
      <TextField title={field[4]} disabled={ true } value={hrEmployee}/>
      {props.plan && (props.plan.stage === stage[3].name || props.plan.stage === stage[4].name || props.plan.stage === stage[5].name) && <SelectField title={field[5]} disabled={ !(props.profile.role === 'Руководитель' && props.plan.stage === stage[3].name || props.profile.role === 'HR-Сотрудник' && props.plan.stage === stage[4].name) } options={rating} update={updateMark} value={mark}/>}
      {props.plan && (props.plan.stage === stage[4].name || props.plan.stage === stage[5].name) && <TextField title={field[6]} disabled={true} value={(props.plan.mark === rating[3].name || props.plan.mark === rating[4].name) ? 'Программа не пройдена' : 'Программа пройдена'}/>}
      <div className="buttonsList">
        { stage.map(stage => {
          return <Stage stage={stage} key={stage.id}/>
        }) }
      </div>
      <div>
        {(props.profile.role !== 'HR-Сотрудник' || props.profile.role === 'HR-Сотрудник' && props.plan.stage === stage[4].name) && <button
          className='nextStage'
          onClick={sendData}
          disabled={
         !(props.profile.role === 'Руководитель' && (props.plan.stage === stage[1].name || props.plan.stage === stage[3].name) ||
           props.profile.role === 'HR-Сотрудник' ||
          props.profile.role === 'Сотрудник' && (props.plan.stage === stage[0].name || props.plan.stage === stage[2].name))
        }
        >
          Отправить
        </button> }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    plan: state.adaptationPlanReducer.plan,
    directors: state.employeesPlanReducer.directors,
    profile: state.profileReducer.profile
  }
}
const mapDispatchToProps = (dispatch, object) => {
  return {
    updateAdaptationPlan: (object) => dispatch(updatePlan(object.plan, object.token)),
    updatePlanStage: (object) => dispatch(updateStage(object.plan, object.token)),
    getDirectors: (object) => dispatch(getDirectors(object.token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainInfo)