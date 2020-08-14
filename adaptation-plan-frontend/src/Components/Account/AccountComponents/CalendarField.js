import React, {useState, useEffect} from 'react';
import Calendar from "react-calendar";
import '../AccountStyles/CalendarField.css'

function CalendarField(props) {
  
  const change = date => {
    props.update(date.toLocaleDateString())
  }
  
  const [calendarShow, setCalendarShow] = useState(false)
  
  function showCalendar() {
    setCalendarShow(true)
  }
  
  useEffect( () => {
    setCalendarShow(false)
  }, [props.value])
  
  return (
      <div className="item">
        <span>{props.title.name}</span>
        <input value={props.value} type="text" className="date" onFocus={showCalendar} disabled={props.disabled}/>
        {
          calendarShow
        &&
        <div className='calendar'>
          <Calendar
            onChange={change}
            maxDate={props.maxDate}
          />
        </div>
        }
      </div>
  );
}

export default CalendarField;