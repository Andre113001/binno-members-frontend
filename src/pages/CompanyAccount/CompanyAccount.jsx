import './App.css' 


import InformationTab from './components/CompanyInformationTab/CompanyInformationTab'
import PostCards from './components/CompanyPosts/CompanyPostCards'
import EventCards from './components/CompanyEvents/CompanyEventCards'

import SideBar from './components/sidebar/SideBar'
import Header from './components/AccountHeader/CompanyAccountHeader'


function CompanyAccount() {

  return (
    <>
    <div className={styles['CompanyAccountPage']}>
      <SideBar />
      <div className={styles['layoutContainer']}>
          <div className={styles['Headline']}>
            <Header />
          </div>
            <div className={styles['bodyContainer']}>
              <div className={styles['AccountContent']}>
                  <InformationTab />
                  <PostCards />
                  <EventCards />
              </div>
            </div>
        </div>        
      </div>

    </>
  )
}

export default App
