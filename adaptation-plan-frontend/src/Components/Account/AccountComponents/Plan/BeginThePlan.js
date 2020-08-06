import React from 'react';
import './BeginThePlan.css'

function BeginThePlan(props) {
  const beginPlan = () => {
    props.updateStage('Начало')
  }
  return (
    <div className="newPlan">
      <p className="offer">Создайте план адаптации для нового сотрудника!</p>
      <button className="createPlan" onClick={beginPlan}>Создать план</button>
    </div>
  );
}


export default BeginThePlan