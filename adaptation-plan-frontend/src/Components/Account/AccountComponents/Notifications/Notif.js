import React, {useEffect} from 'react';
import './Notif.css';

function Notif() {
  
  useEffect( () => {
    document.title = 'Оповещения'
  }, [])
  
  return (
    <div className='notification'>
      Пока нет оповещений!
    </div>
  );
}

export default Notif;