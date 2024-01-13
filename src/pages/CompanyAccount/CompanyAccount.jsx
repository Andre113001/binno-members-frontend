import styles from './CompanyAccount.module.css' 
import React, {useState, useEffect} from 'react'

import InformationTab from './CompanyAccountComponents/CompanyInformationTab/CompanyInformationTab.jsx'
import PostCards from './CompanyAccountComponents/CompanyPosts/CompanyPostCards.jsx'
import EventCards from './CompanyAccountComponents/CompanyEvents/CompanyEventCards.jsx'

import SideBar from '../../components/Sidebar/Sidebar.jsx'
import { Link } from 'react-router-dom'
import AccountHeader from './CompanyAccountComponents/AccountHeader/CompanyAccountHeader.jsx'
// import useAccessToken from '../../hooks/useAccessToken'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import useLoadProfile from '../../hooks/useLoadProfile'
import AccountEdit from './CompanyAccountComponents/CompanyAccountEdit/CompanyAccountEdit.jsx'

function CompanyAccount() {
  const {profileData} = useLoadProfile();
  const [data, setData] = useState([]);
  const [isEditActive, setIsEditActive] = useState(true);

  const toggleEdit = () => {
    setIsEditActive((prev) => !prev);
  };


  useEffect(() => {
      const loadHeadingData = async () => {
          if (profileData) {
              const result = await profileData;
              setData(result)
          }
      }

      loadHeadingData();
  }, [profileData])



  return (
    <>
    <div className={styles['CompanyAccountPage']}>
      <SideBar />
      <div className={styles['layoutContainer']}>
      {isEditActive ? (
        <>
          <div className={styles["Headline"]}>
            <div className={styles["UserProfile"]}>
              <AccountHeader userType={data.user_type} institution={data.setting_institution}/>
                <div className={styles["HeaderButtons"]}>
                    <button className={styles["profileEditButton"]} onClick={toggleEdit}>
                      <EditRoundedIcon/> {isEditActive ? '⠀Edit Profile' : '⠀Save Edit'}
                    </button>
                    <Link to='#' style={{textDecoration: 'none'}}>
                      <button className={styles["ViewPageButton"]}>
                        <VisibilityRoundedIcon/>{isEditActive ? '⠀View Page' : 'Discard Change'}
                        </button>
                    </Link>
                  </div>
              </div>
            </div>
          
            <div className={styles["bodyContainer"]}>
              <div className={styles["AccountContent"]}>
                  <InformationTab
                      description={data.setting_bio}
                      address={data.setting_address}
                      email={data.email_address}
                      phone={data.contact_number}
                      fb={data.contact_facebook}
                  />
                  <InformationTab />
                  <PostCards />
                  <EventCards />
              </div>
              
            </div>
        </>
      ) : (
        <div className={styles["AccountEditPage"]}>
                    <AccountEdit
                      isEditing={true}
                    
                    />
                    <div className={styles["AccountEditSave"]}>
                        <button className={styles["profileSaveButton"]} onClick={toggleEdit}>
                          <EditRoundedIcon/> {isEditActive ? '⠀Edit Profile' : '⠀Save Edit'}
                        </button>
                        <Link to='/account' style={{textDecoration: 'none'}}>
                          <button className={styles["discardButton"]} onClick={toggleEdit}>
                            {isEditActive ? '⠀View Page' : 'Discard Change'}
                            </button>
                        </Link>
                    </div>

                    <div className={styles['EditAccountDescription']}>
                      <InformationTab
                          isEditing={true}
                          description={data.setting_bio}
                          address={data.setting_address}
                          email={data.email_address}
                          phone={data.contact_number}
                          fb={data.contact_facebook}
                        />
                    </div>
                </div>

      )}
        </div>        
      </div>

    </>
  )
}

export default CompanyAccount
