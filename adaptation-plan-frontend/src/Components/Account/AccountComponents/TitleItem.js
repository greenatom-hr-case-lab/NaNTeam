import React from 'react';
import { Link } from 'react-router-dom'
import '../AccountStyles/TitleItem.css';

function TitleItem(props) {
  /*if (!props.locale)*/
    return (
      <Link to={`/${props.state.path}`} className='titleItem' onClick={() => props.updateState(props.state.id)}>
        {props.state.name}
        {(window.location.pathname === `/${props.state.path}`) && <div className='line'/>}
      </Link>)
    /*)
  else
    return (
        <div className='titleItem' onClick={() => props.updateState(props.state.id)}>
          {props.state.name}
          {props.state.show && <div className='line'/>}
        </div>
    );*/
}

export default TitleItem;
