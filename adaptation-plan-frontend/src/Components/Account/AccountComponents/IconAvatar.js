import React from 'react';
import '../AccountStyles/IconAvatar.css';
import {Link} from "react-router-dom";

function IconAvatar(props) {
  return (
    <Link to={`/profile/private`} className="iconAvatar" onClick={() => props.updateState(3)}/>
  );
}

export default IconAvatar;
