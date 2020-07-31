import React from 'react';
import './Stage.css';

function Stage(props) {
  
  return (
    <div className="stage">
      <div
        className={
          'stageBlock tooltip' +
          (props.stage.completed ? ' completed' : '')
        }
      >
        { props.stage.id }
        <div
          className={
            'tooltiptext' +
            (props.stage.completed ? ' completed' : '')
          }
        >
          { props.stage.name }
        </div>
      </div>
      {props.stage.id !== 6 ? <div className={
        (props.stage.completed ? ' completed stageLineGreen' : ' stageLineGray')
      }/> : ''}
    </div>
  );
}

export default Stage;