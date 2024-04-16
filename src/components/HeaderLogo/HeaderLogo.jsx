import React from 'react'
import styles from './HeaderLogo.module.css'
import logo from "../../icon.svg";

const HeaderLogo = () => {
  return (
    <div>
      <header className={styles['logo-header']}>
        <img src={logo} className={styles['logo-img']} alt="binno-logo" />
      </header>
    </div>
  )
}

export default HeaderLogo
