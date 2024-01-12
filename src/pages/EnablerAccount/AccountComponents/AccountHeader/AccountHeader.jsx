import React, { useState, useEffect } from "react";
import styles from './AccountHeader.module.css'

import { companyInformation } from '../../../../assets/companyInfo'

import profileImage from '../../../../assets/siliDeli.svg';
import Coverphoto from '../../../../assets/Coverphoto.png';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { Link } from "react-router-dom";

function AccountHeader(props) {

    return (
    <>
        <div className={styles["Header"]}>
            <div className={styles["profileCoverImage"]}>
                        <img className={styles["coverPhoto"]} src={Coverphoto} alt="Cover Photo" />
                    </div>
                <div className={styles["ProfileHeaderContainer"]}>
                    <div className={styles["userProfile"]}>
                        <div className={styles["profileImageContainer"]}>
                            <img src={profileImage} alt="User Profile" className={styles["profileImage"]}/>
                        </div> 
                                <div className={styles["UserInfoContainer"]}>
                                    <p>{props.userType}</p>
                                    <h2>{props.institution}</h2>
                                </div>
                    </div>

                        <div className={styles["HeaderButtons"]}>
                            <Link to={'/settings'} style={{textDecoration: 'none'}}>
                                <button className={styles["profileEditButton"]} >
                                <EditRoundedIcon/><span style={{margin: '5px'}}>Edit Profile</span></button>
                            </Link>
                            <button className={styles["ViewPageButton"]}>
                                <VisibilityRoundedIcon/><span style={{margin: '5px'}}>View Page</span></button>
                </div>
            </div>
        </div>
    </>
    );
}

export default AccountHeader; 