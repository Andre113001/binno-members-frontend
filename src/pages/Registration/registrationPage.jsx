import React from 'react'
import '../../App.css'
import { Outlet } from 'react-router-dom'

function RegistrationPage() {

  return (
    <>
       <div className="registrationPage">
          <div className="header">
              <img className='logo' src={import.meta.env.VITE_LOGO} 
              alt=""/>
          </div>

          <div className="fromRegistraion">
              <Outlet />
          </div>
      </div>
    </>
  )
}

export default RegistrationPage