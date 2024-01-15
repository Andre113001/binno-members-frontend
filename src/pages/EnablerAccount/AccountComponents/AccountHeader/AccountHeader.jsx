import React, { useState, useEffect } from "react";
import styles from './AccountHeader.module.css'

import { companyInformation } from '../../../../assets/companyInfo'

import profileImage from '../../../../assets/siliDeli.svg';
import Coverphoto from '../../../../assets/Coverphoto.png';

import { fetchImage } from "../../../../hooks/image-hook";
import useLoadProfile from "../../../../hooks/useLoadProfile";

function AccountHeader(props) {

    const {profileData} = useLoadProfile()
    const [imageSrc, setImageSrc] = useState()

    useEffect(() => {
        const loadData = async () => {
            const pic = await fetchImage(profileData.setting_profilepic)
            setImageSrc(URL.createObjectURL(pic))
        }

        loadData()
    }, [])

    return (
    <>
        <div className={styles["Header"]}>
            <div className={styles["profileCoverImage"]}>
                        <img className={styles["coverPhoto"]} src={imageSrc} alt="Cover Photo" />
                    </div>
                <div className={styles["ProfileHeaderContainer"]}>
                    <div className={styles["userProfile"]}>
                        <div className={styles["profileImageContainer"]}>
                            <img src={imageSrc} alt="User Profile" className={styles["profileImage"]}/>
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