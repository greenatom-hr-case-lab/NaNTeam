import React, {useState} from 'react';
import Calendar from "react-calendar";
import '../AccountStyles/CalendarField.css'
import Datepicker from "react-datepicker"
function CalendarField(props) {
  
  const change = date => {
    hideCalendar()
    console.log(date.toLocaleDateString())
    props.update(date.toLocaleDateString())
  }
  
  const [calendarShow, setCalendarShow] = useState(false)
  
  function showCalendar() {
    setCalendarShow(true)
  }
  
  function hideCalendar() {
    console.log('hidecalendar')
    setTimeout(() => setCalendarShow(false), 100)
  }
  
  return (
      <div className="item">
        <span>{props.title.name}</span>
        <input defaultValue={props.value} type="text" className="date" onFocus={showCalendar} disabled={props.disabled}/>
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