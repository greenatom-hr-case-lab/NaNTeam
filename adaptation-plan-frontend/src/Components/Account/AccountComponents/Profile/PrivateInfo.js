import React, {useState} from 'react';
import {connect} from "react-redux";
import "./PrivateInfo.css"
import CalendarField from "../CalendarField";
import TextField from "../TextField";

function PrivateInfo(props) {
  const [field, setField] = useState([
    {id: 1, name: 'Дата рождения', disabled: true},
    {id: 2, name: 'Почта', disabled: true},
  ])
  
  return (
    <div className="privateInfo">
      <CalendarField title={field[0]} disabled={field[1].disabled} value={props.profile.birthDate}/>
      <TextField title={field[1]} placeholder={'example@greenatom.ru'} disabled={field[1].disabled} value={props.profile.email}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.profileReducer.loading,
    profile: state.profileReducer.profile,
    error: state.profileReducer.error
  }
}


export default connect(mapStateToProps, null)(PrivateInfo);
