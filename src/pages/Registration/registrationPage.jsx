import React from 'react'
import '../../App.css'
import { Outlet } from 'react-router-dom'

function RegistrationPage() {

  return (
    <>
       <div className="registrationPage">
          <div className="header">
              <img className='logo' src="../../../public/img/binno-logo.png" 
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