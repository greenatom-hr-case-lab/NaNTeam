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
    {id: 6, name: 'Оценка'}
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
    updatePlan()
    if (props.plan) {
      if (props.user.role === 'HR-сотрудник' && (props.plan.stage === stage[0].name) ||
        props.user.role === 'Руководитель' && (props.plan.stage === stage[2].name || props.plan.stage === stage[4].name) ||
        props.user.role === 'Сотрудник' && (props.plan.stage === stage[1].name || stage[3].name)) {
        let i = 0
        while (stage[i].completed) {
          i++
        }
        setStage(stage.map((stage, index) => {
          if (index === i) stage[index].completed = true
          return stage
        }))
        props.updatePlanStage({token: token, plan: {stage: stage[i + 1].name, _id: props.plan._id}})
      }
    }
  }
  
  useEffect(() => {
    console.log('TOKEN', props.token)
    console.log('stages', stage)
    props.getDirectors({token: token})
    console.log('props.user-->', props.user)
    let i = 0
    if (props.plan) {
      console.log(props.plan.stage)
      while (stage[i].name !== props.plan.stage) {
        i++
      }
      setStage(stage.map((stage, index) => {
        if (index < i) stage[index].completed = true
        return stage
      }))
    }
  }, [])
  
  const [position, setPosition] = useState(props.plan ? props.plan.position : null)
  const [directiorEmployee, setDirectiorEmployee] = useState(props.plan ? props.plan.directiorEmployee : null)
  const [adaptationPeriodStart, setAdaptationPeriodStart] = useState(props.plan ? props.plan.adaptationPeriodStart : null)
  const [adaptationPeriodEnd, setAdaptationPeriodEnd] = useState(props.plan ? props.plan.adaptationPeriodEnd : null)
  const [hrEmployee, setHREmployee] = useState(props.user.name)
  const [mark, setMark] = useState(props.plan ? props.plan.mark : null)
  
  const updatePlan = () => {
    console.log('updateplan')
    console.log((props.plan ? !props.plan.stage : !props.plan) || props.plan.stage  && mark)
    console.log(Boolean(position) &&
    directiorEmployee &&
    adaptationPeriodStart &&
    adaptationPeriodEnd &&
    hrEmployee)
    console.log(position)
    console.log(directiorEmployee)
    console.log(adaptationPeriodStart)
    console.log(adaptationPeriodEnd)
    console.log(hrEmployee)
    if (
      ((props.plan ? !props.plan.stage : !props.plan) || props.plan.stage  && mark) &&
      position &&
      directiorEmployee &&
      adaptationPeriodStart &&
      adaptationPeriodEnd &&
      hrEmployee
    ) {console.log('зашел в if'); props.updateAdaptationPlan({token: props.token, plan: {
        fioEmployee: props.user, position: position, directorEmployee: directiorEmployee._id, adaptationPeriodStart: adaptationPeriodStart, adaptationPeriodEnd: adaptationPeriodEnd, hrEmployee: hrEmployee, mark: mark,
        dateCreate: props.plan? props.plan.dateCreate : date.toLocaleDateString
    }})}
    else alert('все доступные поля должны быть заполнены')
  }
  
  const updatePosition = (value) => {
    setPosition(value)
    
  }
  const updateDirectiorEmployee = (value) => {
    setDirectiorEmployee(value)
  }
  const updateAdaptationPeriodStart = (value) => {
    setAdaptationPeriodStart(value)
  }
  function updateAdaptationPeriodEnd(value) {
    setAdaptationPeriodEnd(value)
  }
  const updateMark = (value) => {
    setMark(value)
  }
  
  return (
    <div className="mainInfo">
      <p>Дата создания плана: {props.plan ? props.plan.dateCreate : date.toLocaleDateString()}</p>
      <TextField title={field[0]} disabled={ props.user.role === 'HR-сотрудник' } update={updatePosition} value={position} />
      <SelectField title={field[1]} disabled={ props.user.role === 'HR-сотрудник' } options={props.directors} update={updateDirectiorEmployee} value={directiorEmployee} />
      <CalendarField title={field[2]} disabled={ props.user.role === 'HR-сотрудник' } update={updateAdaptationPeriodStart} value={adaptationPeriodStart}/>
      <CalendarField title={field[3]} disabled={ props.user.role === 'HR-сотрудник' } update={updateAdaptationPeriodEnd} value={adaptationPeriodEnd}/>
      <TextField title={field[4]} disabled={ true } value={hrEmployee}/>
      <SelectField title={field[5]} disabled={ !(props.user.role === 'Руководитель' && props.plan.stage === stage[4].name)} options={rating} update={updateMark} value={mark}/>
      <div className="buttonsList">
        { stage.map(stage => {
          return <Stage stage={stage} key={stage.id}/>
        }) }
      </div>
      <button className='nextStage' onClick={sendData} /*disabled={
       !(props.user.role === 'HR-сотрудник' && (props.plan.stage === stage[0].name) ||
        props.user.role === 'Руководитель' && (props.plan.stage === stage[2].name || props.plan.stage === stage[4].name) ||
        props.user.role === 'Сотрудник' && (props.plan.stage === stage[1].name || stage[3].name) )
      }*/>Отправить</button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    plan: state.adaptationPlanReducer.plan,
    directors: state.employeesPlanReducer.directors,
    user: state.authReducer.user
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