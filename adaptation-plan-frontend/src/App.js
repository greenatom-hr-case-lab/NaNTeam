import React from 'react';
import './App.css';
import Account from "./Components/Account/AccountComponents/Account";
import Plan from "./Components/Account/AccountComponents/Plan/Plan";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import SignIn from "./Components/Auth/authComponents/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={SignIn}/>
        <Route path='/' component={Account}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
