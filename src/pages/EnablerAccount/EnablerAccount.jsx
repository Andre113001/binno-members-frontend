import React, {useState, useEffect} from 'react'
import styles from './EnablerAccount.module.css'
import { Link } from 'react-router-dom'
import InformationTab from './AccountComponents/EnablerInformationTab/InformationTab'
import GuideCards from './AccountComponents/EnablerGuides/GuidesCards'
import BlogCards from './AccountComponents/EnablerBlog/BlogCards'
import EventCards from './AccountComponents/EnablerEvents/EventCards'

import SideBar from '../../components/Sidebar/Sidebar';
import AccountHeader from './AccountComponents/AccountHeader/AccountHeader'
// import useAccessToken from '../../hooks/useAccessToken'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import useLoadProfile from '../../hooks/useLoadProfile'

function EnablerAccount() {
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
    <div className={styles["EnablerAccountPage"]}>
      <SideBar />
      <div className={styles["layoutContainer"]}>
        {isEditActive ? (
         <>
          <div className={styles["Headline"]}>
            <div className={styles["UserProfile"]}>
              <AccountHeader userType={data.user_type} institution={data.setting_institution}/>
            </div>
              <div className={styles["HeaderButtons"]}>
                  <button className={styles["profileEditButton"]} onClick={toggleEdit}>
                    <EditRoundedIcon/> {isEditActive ? '⠀Edit Profile' : '⠀Editing'}
                  </button>
                  <Link to='#' style={{textDecoration: 'non'}}>
                    <button className={styles["ViewPageButton"]}>
                      <VisibilityRoundedIcon/><span style={{margin: '5px'}}>View Page</span>
                      </button>
                  </Link>
                  </div>
          </div>
          
            <div className={styles["bodyContainer"]}>
              <div className={styles["CompanyInfoGuidesContainer"]}>
                  <InformationTab
                      description={data.setting_bio}
                      address={data.setting_address}
                      email={data.email_address}
                      phone={data.contact_number}
                      fb={data.contact_facebook}
                  />
                  <div className={styles["guideContainer"]}>
                    <GuideCards />
                  </div>
                  
              </div>
                <div className={styles["BlogEventContainer"]}>
                    <BlogCards />
                    <EventCards />
                </div>
            </div>
            </>
           ) : (
            
              <div className={styles['EditProfile']}>
                <InformationTab
                    isEditing={true}
                    description={data.setting_bio}
                    address={data.setting_address}
                    email={data.email_address}
                    phone={data.contact_number}
                    fb={data.contact_facebook}
                  />
            </div>
          )}
        </div>        
      </div>

    </>
  )
}

export default EnablerAccount;
