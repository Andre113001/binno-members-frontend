import React, {useState, useEffect} from 'react'
import styles from './AccountPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import InformationTab from './AccountComponents/InformationTab/InformationTab'
import GuideCards from './AccountComponents/EnablerGuides/GuidesCards'
import BlogCards from './AccountComponents/EnablerBlog/BlogCards'
import EventCards from './AccountComponents/EnablerEvents/EventCards'

import SideBar from '../../components/Sidebar/Sidebar';
import AccountHeader from './AccountComponents/AccountHeader/AccountHeader'
// import useAccessToken from '../../hooks/useAccessToken'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import useLoadProfile from '../../hooks/useLoadProfile'
import AccountEdit from './AccountComponents/AccountEdit/AccountEdit'
import PostCards from './AccountComponents/CompanyPosts/CompanyPostCards'
import CompanyEvents from './AccountComponents/CompanyEvents/CompanyEventCards'
import useHttp from '../../hooks/http-hook';
import useCustomSnackbar from '../../hooks/useCustomSnackbar'


function AccountPage() {
  const { profileData } = useLoadProfile();
  const [data, setData] = useState([]);
  const [isEditActive, setIsEditActive] = useState(true);
  const { sendRequest, isLoading } = useHttp();
  const { SnackbarComponent, showSnackbar } = useCustomSnackbar();
  const navigate = useNavigate();
  
  const [ bio, setBio ] = useState();
  const [ contactNum, setContactNum ] = useState();
  const [ classification, setClassification ] = useState();
  const [ email, setEmail ] = useState();
  const [ tagline, setTagline ] = useState();
  const [ address, setAddress ] = useState();
  const [ companyLinks, setCompanyLinks ] = useState();

  useEffect(() => {
    const loadData = async () => {
      setBio(profileData.setting_bio);
      setContactNum(profileData.contact_number);
      setEmail(profileData.email_address);
      setTagline(profileData.setting_tagline);
      setAddress(profileData.setting_address);
      setCompanyLinks(profileData.companyLinks);
    }

    loadData();
  }, [profileData])

  const toggleEdit = () => {
    setIsEditActive((prev) => !prev);
  };

  useEffect(() => {
      const loadHeadingData = async () => {
          if (profileData) {
              const result =  profileData;
              setData(result)
          }
      }

      loadHeadingData();
  }, [profileData])

  useEffect(() => {
    // Redirect logic based on member_first_time
    if (profileData && profileData.member_first_time === 1) {
       navigate('/getting-started', {state: { profileData }})
    }
  }, [profileData, navigate]);

  const handleSaveAll = async () => {
    const res = await sendRequest({
      url: `${import.meta.env.VITE_BACKEND_DOMAIN}/members/update-profile`,
      method: 'POST',
      body: JSON.stringify({
        member_id: profileData.member_id,
        bio,
        contactNum,
        email,
        tagline,
        address,
        companyLinks
      }),
      headers: {
        'Content-Type': 'application/json', // Set Content-Type for file uploads
      },
    })

    if (res.message === 'Profile settings and contact updated successfully') {
      showSnackbar('Profile Saved Successfully', 'success');
      setTimeout(() => {
        window.location.reload(); 
      }, 1000);
    }
  }

  // console.log(profileData);

  return (
    <>
    <SnackbarComponent/>
    <div className={styles["AccountPage"]}>
      <SideBar />
      <div className={styles["layoutContainer"]}>
        {isEditActive ? (
         <>
          <div className={styles["Headline"]}>
            <div className={styles["UserProfile"]}>
              <AccountHeader userType={data.user_type} institution={data.setting_institution}/>
              <div className={styles["HeaderButtons"]}>
                {isEditActive && ( // Only render the buttons if isEditActive is true
                    <>
                        <button className={styles["profileEditButton"]} onClick={toggleEdit}>
                            <EditRoundedIcon/> {isEditActive ? '⠀Edit Profile' : '⠀Save Edit'}
                        </button>
                        <Link to={`https://binnostartup.site/startup-enabler-profile.php?setting_institution=${profileData?.setting_institution}&member_id=${profileData?.member_id}`} style={{textDecoration: 'none'}}> {/*link san viewer side sa profile*/}
                            <button className={styles["ViewPageButton"]}>
                                <VisibilityRoundedIcon/> View Page
                            </button>
                        </Link>
                    </>
                )}
              </div>
            </div>
          </div>
            {profileData?.user_type === "Startup Enabler" ? (
              <div className={styles["bodyContainer"]}>
              <div className={styles["CompanyInfoGuidesContainer"]}>
                  <InformationTab
                      member_id={profileData.member_id}
                      description={data.setting_bio}
                      address={data.setting_address}
                      email={data.email_address}
                      phone={data.contact_number}
                      fb={data.contact_facebook}
                  />
                  <div className={styles["guideContainer"]}>
                    <GuideCards profileData={profileData}/>
                  </div>
                  
              </div>
                <div className={styles["BlogEventContainer"]}>
                    <BlogCards profileData = {profileData}/>
                    <EventCards profileData={profileData}/>
                </div>
            </div>
            ) : profileData?.user_type === "Startup Company" ? (
              <div className={styles['bodyContainer']}>
                <div className={styles['AccountContent']}>
                  <div className={styles["informationTabContainer "]}>
                    <InformationTab
                        member_id={profileData.member_id}
                        description={data.setting_bio}
                        address={data.setting_address}
                        email={data.email_address}
                        phone={data.contact_number}
                        fb={data.contact_facebook}
                    />
                  </div>
                  <PostCards profileData={profileData}/>
                  <CompanyEvents profileData={profileData}/>
                </div>
             </div>
            ) : (
              <></>
            )
          }
            
            </>
           ) : (
                <div className={styles["AccountEditPage"]}>
                    <AccountEdit
                      isEditing={true}
                    
                    />
                    <div className={styles["AccountEditSave"]}>
                        {/* <button className={styles["profileSaveButton"]} onClick={toggleEdit}>
                          <EditRoundedIcon/> {isEditActive ? '⠀Edit Profile' : '⠀Save Edit'}
                        </button> */}
                        <Link to='/account' style={{textDecoration: 'none'}}>
                          <button className={styles["discardButton"]} onClick={(e) => {
                            e.preventDefault();
                            handleSaveAll();
                          }}>
                            {isEditActive ? '⠀View Page' : 'Save Changes'}
                            </button>
                        </Link>
                    </div>

                    <div className={styles['EditAccountDescription']}>
                      <InformationTab
                          isEditing={true}
                          member_id={profileData.member_id}
                          description={data.setting_bio}
                          address={data.setting_address}
                          email={data.email_address}
                          phone={data.contact_number}
                          fb={data.contact_facebook}
                          handleSaveAll={handleSaveAll}
                          setBio={setBio}
                          setClassification={setClassification}
                          setContactNum={setContactNum}
                          setEmail={setEmail}
                          setTagline={setTagline}
                          setAddress={setAddress}
                          setCompanyLinks={setCompanyLinks}
                          profileData={profileData}
                        />
                    </div>
                </div>
                
          )}
        </div>        
      </div>

    </>
  )
}

export default AccountPage;
