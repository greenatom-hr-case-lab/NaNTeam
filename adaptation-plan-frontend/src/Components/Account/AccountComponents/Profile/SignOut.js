import React, {useState} from 'react';
import { connect } from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import { deleteSession } from '../../../../redux/actions/auth'
import './SignOut.css'

function SignOut(props) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  function authOut() {
    setToken('')
    props.deleteToken()
  }
  
  return (
    <div>
      <button className="signOut" onClick={authOut}/>
      {!token && <Redirect to="/"/>}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    deleteToken: () => dispatch(deleteSession())
  }
}
export default connect(null, mapDispatchToProps)(SignOut);
