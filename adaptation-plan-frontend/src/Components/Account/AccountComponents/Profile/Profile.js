import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Route, Switch, Redirect} from "react-router-dom";
import { profileFetchData } from "../../../../redux/actions/profile"
import './Profile.css';
import SignOut from "./SignOut";
import Loader from "../Loader"
import PrivateInfo from "./PrivateInfo";
import 'react-calendar/dist/Calendar.css';
import TitleItem from "../TitleItem";



function Profile(props) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  useEffect(() => {
    props.fetchData({token: token})
  }, [])
  
  const [state, setState] = useState([
      {id: 1, name: 'Личная информация', path: 'profile/private', show: false},
      {id: 2, name: 'Работа', path: 'profile/job', show: false}
    ]
  )
  
  function updateState(id){
    setState(
      state.map(state => {
        state.id === id ? state.show = true : state.show = false;
        return state;
      })
    )
  }
  if (token) {
      return (
        <div className="profile">
          <div className="avatarCard">
            <div className="avatar"/>
            <div className="caption">
              <div>
                <div className="titleName">{props.profile.name}</div>
                <div>{props.profile.role}</div>
              </div>
              <SignOut/>
            </div>
          </div>
          <div className="container">
            <div className="titles">
              {state.map(function (state) {
                  return <TitleItem state={state} updateState={updateState} key={state.id} locale={true}/>
                }
              )}
            </div>
            <div className="content">
              <Switch>
                <Route exact path='/profile/private' component={PrivateInfo}/>
              </Switch>
            </div>
          </div>
        </div>
      )
  }
  else
    return <Redirect to="/" />
}

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    loading: state.profileReducer.loading,
    profile: state.profileReducer.profile,
    error: state.profileReducer.error
  }
}

const mapDispatchToProps = (dispatch, object) => {
   return {
    fetchData: (object) => dispatch(profileFetchData(object))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);