import React from "react";
import styles from './CompanyAccountHeader.module.css'
// import { companyInformation } from '../../assets/companyInfo'

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

function AccountHeader() {
    return (
    <>
        <div className={styles['CompanyAccountHeader']}>
            <div className={styles['profileCoverImage']}>{styles['profileImage']}
                        <img className={styles['coverPhoto']} src={companyInformation.userCover} alt="Cover Photo" />
                    </div>
                <div className={styles['profileImageContainer']}>
                    <div className={styles['userProfile']}>
                        <img src={companyInformation.userProfile} alt="User Profile" className={styles['profileImage']}/>    
                    </div>
                        <div className={styles['UserInfoContainer']}>
                                <p>{companyInformation.userType}</p>
                                <h2>{companyInformation.username}</h2>
                            </div>
                </div>
                    <div className={styles['HeaderButtons']}>
                        <button className={styles['profileEditButton']}>
                            <EditRoundedIcon/> Edit Profile</button>

                        <button className={styles['ViewPageButton']}>
                            <VisibilityRoundedIcon/> View Page</button>
                    </div>
                        
            </div>
    </>
    );
}

export default AccountHeader; 