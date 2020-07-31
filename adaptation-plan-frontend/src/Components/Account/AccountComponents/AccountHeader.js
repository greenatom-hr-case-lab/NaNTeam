import React, {useState} from 'react';
import '../AccountStyles/AccountHeader.css';
import IconBell from "./IconBell";
import IconAvatar from "./IconAvatar";
import TitleItem from "./TitleItem"

function AccountHeader() {
  
  const [state, setState] = useState([
    {id: 1, name: 'План адаптации', path: 'plan', show: false},
    {id: 2, name: 'Новости', path: 'news', show: false}
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
  
  return (
    <div className="header">
      <div className="headerLeft">
        <a href="https://greenatom.ru/">
          <div className="logo"/>
        </a>
        <div className="title">
          {state.map(function (state) {
            return <TitleItem state={state} updateState={updateState} key={state.id} locale={false}/>
            }
          )}
          {/* if руководитель then еще title если надо*/}
          {/* if сотрудник кадровой службы then еще title если надо*/}
        </div>
      </div>
      <div className="icons headerRight">
        <IconBell updateState={updateState}/>
        <IconAvatar updateState={updateState}/>
      </div>
    </div>
  );
}

export default AccountHeader;
