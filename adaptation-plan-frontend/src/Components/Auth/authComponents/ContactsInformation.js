import React from 'react'
import './ContactsInformation.css'

export default function Info(){
    return(
      <div className='footer'>
        <div className='mailTitle'>
          <button className='mail'/>
          <span className='sansation'>info@greenatom.ru</span>
        </div>
        <div className='phoneTitle'>
          <button className='phone'/>
          <span className='sansation'>+7 (499) 949-49-19</span>
        </div>
      </div>
    )
}