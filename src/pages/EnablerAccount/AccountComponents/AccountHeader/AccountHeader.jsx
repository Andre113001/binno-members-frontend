import React, { useState, useEffect } from "react";
import styles from './AccountHeader.module.css'

import { companyInformation } from '../../../../assets/companyInfo'

import profileImage from '../../../../assets/siliDeli.svg';
import Coverphoto from '../../../../assets/Coverphoto.png';

import { fetchImage } from "../../../../hooks/image-hook";
import useLoadProfile from "../../../../hooks/useLoadProfile";

function AccountHeader(props) {

    const {profileData} = useLoadProfile()
    const [profilePic, setProfilePic] = useState();
    const [coverPic, setCoverPic] = useState();

    useEffect(() => {
        const loadData = async () => {
            const profilePicPath = await fetchImage(profileData.setting_profilepic);
            const coverPicPath = await fetchImage(profileData.setting_coverpic);
            
            console.log(profileData.setting_profilepic);
            console.log(profileData.setting_coverpic);

            const profilePicBlob = new Blob([profilePicPath], { type: 'image/jpeg' });
            const coverPicBlob = new Blob([coverPicPath], { type: 'image/jpeg' });
            
            setProfilePic(URL.createObjectURL(profilePicBlob));
            setCoverPic(URL.createObjectURL(coverPicBlob));
        }

        if(profileData) loadData()
    }, [profileData])

    return (
    <>
        <div className={styles["Header"]}>
            <div className={styles["profileCoverImage"]}>
                        <img className={styles["coverPhoto"]} src={coverPic} alt="Cover Photo" />
                    </div>
                <div className={styles["ProfileHeaderContainer"]}>
                    <div className={styles["userProfile"]}>
                        <div className={styles["profileImageContainer"]}>
                            <img src={profilePic} alt="User Profile" className={styles["profileImage"]}/>
                        </div> 
                                <div className={styles["UserInfoContainer"]}>
                                    <p>{props.userType}</p>
                                    <h2>{props.institution}</h2>
                                </div>
                    </div>
            </div>
        </div>
    </>
    );
}

export default AccountHeader; 