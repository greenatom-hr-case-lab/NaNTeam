import React from 'react';
import '../AccountStyles/IconBell.css';
import {Link} from "react-router-dom";

function IconBell(props) {
  return (
    <Link to={`/notifications`} className="iconBell" onClick={() => props.updateState(3)}>
      <div className="iconNotification"/>
    </Link>
  );
}

export default IconBell;
