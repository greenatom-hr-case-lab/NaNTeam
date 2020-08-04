import React, { useState } from 'react';
import { connect } from 'react-redux'
import { authFetchData } from '../../../redux/actions/auth'
import { Redirect } from 'react-router-dom'
import Loader from '../../Account/AccountComponents/Loader'
import './LoginPassword.css'

function Inputs(props) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    function sendData(e) {
        e.preventDefault()
        props.fetchData({login: login, password: password})
    }
    
    const onChangeLogin = (event) => {
        setLogin(event.target.value)
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }
    return (
      <div>
        <form>
          <input type="text"
                 className='input'
                 onChange={onChangeLogin}
                 placeholder="Введите логин" />
          <input type="text"
                 className='input'
                 onChange={onChangePassword}
                 placeholder="Введите пароль"/>
          <button onClick={sendData} className='sendForm'>Вход</button>
        </form>
        {props.loading && <Loader/>}
        {props.token && <Redirect from="/" to="/profile/private"/>}
      </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        token: state.authReducer.token,
        error: state.authReducer.error
    }
}

const mapDispatchToProps = (disptach) => {
    return {
        fetchData: (object) => disptach(authFetchData(object))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inputs) ;