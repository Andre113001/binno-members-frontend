import React, { useState, useEffect } from "react";
import styles from './AccountHeader.module.css'

import { fetchImage } from "../../../../hooks/image-hook";
import useLoadProfile from "../../../../hooks/useLoadProfile";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


function AccountHeader(props) {

    const {profileData} = useLoadProfile()
    const [profilePic, setProfilePic] = useState();
    const [coverPic, setCoverPic] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const profilePicPath = await fetchImage(`profile-img/${profileData.setting_profilepic}`);
            const coverPicPath = await fetchImage(`profile-cover-img/${profileData.setting_coverpic}`);
            
            // console.log(profileData.setting_profilepic);
            // console.log(profileData.setting_coverpic);

            const profilePicBlob = new Blob([profilePicPath], { type: 'image/jpeg' });
            const coverPicBlob = new Blob([coverPicPath], { type: 'image/jpeg' });
            
            setProfilePic(URL.createObjectURL(profilePicBlob));
            setCoverPic(URL.createObjectURL(coverPicBlob));
            setLoading(false);
        }

        if(profileData) loadData()
    }, [profileData])

    return (
    <>
        <div className={styles["Header"]}>
            <div className={styles["profileCoverImage"]}>
                {loading ? (
                        <Stack spacing={1}>
                            <Skeleton variant="rectangular" width={'100%'} height={'300px'} />
                        </Stack>
                    ) : (
                        <img className={styles["coverPhoto"]} src={coverPic} alt="Cover Photo" />
                    )}
                </div>
                <div className={styles["ProfileHeaderContainer"]}>
                    <div className={styles["userProfile"]}>
                        <div className={styles["profileImageContainer"]}>
                            {loading ? (
                                <Stack spacing={1}>
                                    <Skeleton variant="circular" width={'150px'} height={'150px'} />
                                </Stack>
                            ) : (
                                <img src={profilePic} alt="User Profile" className={styles["profileImage"]}/>
                            )}
                        </div> 
                                <div className={styles["UserInfoContainer"]}>
                                    {loading ? (
                                        <Stack spacing={1}>
                                            <Skeleton variant="text" sx={{ fontSize: '1rem' , width: '200px', marginTop: '10px'}} />
                                            <Skeleton variant="text" sx={{ fontSize: '1rem' , width: '150px', marginTop: '10px' }} />
                                        </Stack>
                                    ) : (
                                            <>
                                                <p>{props.userType}</p>
                                                <h2>{props.institution}</h2>
                                            </>
                                    )}
                                </div>
                    </div>
            </div>
        </div>
    </>
    );
}

export default AccountHeader; 