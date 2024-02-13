import React, { useState, useEffect } from 'react';
import styles from './GuideMain.module.css';
import GuideCards from './GuidesCards.jsx';
import SideBar from '../../components/Sidebar/Sidebar.jsx';
import Header from '../../components/header/Header.jsx';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GuideModal from '../../components/guidesModal/GuidesModal.jsx';

import { Link } from 'react-router-dom';
import useLoadProfile from '../../hooks/useLoadProfile.jsx'
// import useAccessToken from '../../hooks/useAccessToken.jsx';
// import useLoadProfile from '../../hooks/useLoadProfile.jsx';
// import sha256 from 'sha256';

const GuideMain = () => {
  const { profileData }= useLoadProfile();

  return (
    <>
      <div className={styles["GuideMainPage"]}>
        <SideBar />
        <div className={styles["layoutContainer"]}>
          <div className={styles["Headline"]}>
            <Header />
          </div>
          <div className={styles["bodyContainer"]}>
            <h1>My Guides</h1>
            <div className={styles["blogButtons"]}>
              <div className={styles["CreateGuideContainer"]}>
                  <GuideModal profileData={profileData}/>
              </div>
            </div>
            <div className={styles["contents"]}>
              <GuideCards profileData={profileData}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideMain;
