import React from 'react';
import './BeginThePlan.css'

function BeginThePlan(props) {
  const onClickq = () => {
    console.log('chf,jnfkj')
    props.updateStage()
  }
  return (
    <div className="newPlan">
      <p className="offer">Создайте план адаптации для нового сотрудника!</p>
      <button className="createPlan" onClick={onClickq}>Создать план</button>
    </div>
  );
}


export default BeginThePlan