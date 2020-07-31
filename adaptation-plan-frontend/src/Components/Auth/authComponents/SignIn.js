import React, {useRef, useState} from 'react';
import Inputs from './LoginPassword'
import Info from './ContactsInformation'
import LogoGreenatom from './Logo';
import LabelGreenatom from './Label';
import TextField from "../../Account/AccountComponents/TextField";


function SignIn() {
  const [position, setPosition] = useState()
  
  const updatePosition = (value) => {
    console.log(value)
    setPosition(value)
  }
  
  return (
    <div>
       <LogoGreenatom/>
       <LabelGreenatom />
       <Inputs/>
       <Info/>
       {/*<TextField value={position} update={updatePosition}/>*/}
    </div>
    
  );
}

export default SignIn;
