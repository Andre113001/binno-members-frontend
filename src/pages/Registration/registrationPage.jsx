import React from 'react'
import '../../App.css'
import logo from '../../icon.svg'
import { Outlet } from 'react-router-dom'

function RegistrationPage() {

  return (
    <>
       <div className="registrationPage">
          <div className="header">
            <img src={logo} alt="" width={350}/>
          </div>

          <div className="fromRegistraion">
              <Outlet />
          </div>
      </div>
    </>
  )
}

export default RegistrationPage