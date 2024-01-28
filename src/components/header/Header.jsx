import React, { useContext, useEffect, useState } from "react";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import profileImage from '../../siliDeli.svg'
import './Header.css'
import useLoadProfile from "../../hooks/useLoadProfile";
import AccountContext from "../../context/accountContext";
import { fetchImage } from '../../hooks/image-hook'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


function Header() {
    const accountContext = useContext(AccountContext);
    const [profilePic, setProfilePic] = useState();
    const [headingData, setHeadingData] = useState([]);
    const { profileData } = useLoadProfile();
    const [loadingProfile, setLoadingProfile] = useState(true);



    useEffect(() => {
        const loadHeadingData = async () => {
            if (profileData) {
                const res = await fetchImage(profileData.setting_profilepic);
                setProfilePic(URL.createObjectURL(res));
                setLoadingProfile(false);
            }
        }

        loadHeadingData();
    }, [profileData])

    return (
        <div className="Header">
            <div className="profileImageContainer"> 
                <div className="userProfile">
                    {loadingProfile ? (
                            <Stack spacing={1}>
                                <Skeleton variant="rectangular" width={'100%'} height={70} />
                            </Stack>
                        ) : (
                    <>
                        <img src={profilePic} alt="User Profile" className="profileImage"/>
                    </>
                    )} 
                </div>
                <div className="UserInfoContainer">
                        <p id="userType">{accountContext.profileData?.user_type}</p>
                        <h2 id="username">{accountContext.profileData?.setting_institution}</h2>
                    </div>
            </div>

            {/* <div className="NotificationBell">
                <NotificationsRoundedIcon />
            </div> */}
        </div>
    );
}

export default Header; 