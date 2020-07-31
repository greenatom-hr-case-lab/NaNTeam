import React, {useState} from 'react';
import '../AccountStyles/TextField.css'

function TextField(props) {
  
  return (
    <div className="item">
      <span>{props.title.name}</span>
      <input
        defaultValue={props.value}
        className="textField"
        type="text"
        onBlur={(e) => props.update(e.target.value)}
      disabled={props.disabled}/>
    </div>
  );
}

export default TextField