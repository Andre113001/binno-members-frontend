import React, { useState, useEffect , useRef } from "react";
import styles from './AccountEdit.module.css'

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import useLoadProfile from "../../../../hooks/useLoadProfile";

import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import useHttp from "../../../../hooks/http-hook";
import axios from "axios";

import { fetchImage } from "../../../../hooks/image-hook";

function AccountEdit(props) {
    const [uploadedFileCover, setUploadedFileCover] = useState()
    const [uploadErrorCover, setUploadErrorCover] = useState(null)
    const [uploadedFileProfile, setUploadedFileProfile] = useState()
    const [uploadErrorProfile, setUploadErrorProfile] = useState(null)
    const fileRefCover = useRef();
    const fileRefProfile = useRef();
    const { sendRequest, isLoading } = useHttp();

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


    const handleCoverUpload = async (e) => {
        const file = e.target.files[0]

        const isImage = file.type.split('/')[0] === 'image' ?? false

        if (!isImage) {
            setUploadError('The uploaded file is not a valid image.')
            return
        }

        if (!checkFileSize(file)) {
            setUploadError(
                'The image size exceeds the maximum allowed size of 5 MB.'
            )
            return
        }

        setUploadedFileCover(file)
        setUploadErrorCover(null)
        
        try {
            const fileAsbase64 = await readFileAsBase64(file);
            const requestData = {
                image: fileAsbase64
            }
            
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/images/update?filePath=profile-cover-img/${profileData.setting_coverpic}`, requestData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set Content-Type for file uploads
                },
            })

            const requestData2 = {
                newCoverPic: res.data.imageName,
                id: profileData.setting_id
            }

            if (res.data.result === true) {
                const res2 = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/members/update-profile-cover`, requestData2)

                console.log(res2.data);
            }
        } catch (error) {
            console.log('error: ', error);
        }


        return []
    };

    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleProfileUpload = async (e) => {
        const file = e.target.files[0]

        const isImage = file.type.split('/')[0] === 'image' ?? false

        if (!isImage) {
            setUploadError('The uploaded file is not a valid image.')
            return
        }

        if (!checkFileSize(file)) {
            setUploadError(
                'The image size exceeds the maximum allowed size of 5 MB.'
            )
            return
        }

        // const res = await 

        setUploadedFileProfile(file)
        setUploadErrorProfile(null)
        
        try {
            const fileAsbase64 = await readFileAsBase64(file);
            const requestData = {
                image: fileAsbase64
            }
            
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/images/update?filePath=profile-img/${profileData.setting_profilepic}`, requestData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set Content-Type for file uploads
                },
            })

            const requestData2 = {
                newProfilePic: res.data.imageName,
                id: profileData.setting_id
            }

            if (res.data.result === true) {
                const res2 = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/members/update-profile-img`, requestData2)

                console.log(res2.data);
            }
        } catch (error) {
            console.log('error: ', error);
        }
        return []
    }

    const checkFileSize = (file) => {
        const fileSizeInMB = file.size / (1024 * 1024)

        if (fileSizeInMB > 5) {
            setUploadError(
                'The file size is too large. Please upload a file that is smaller than 5MB.'
            )
            return false
        }

        return true
    }
    
    return (
    <>
        <div className={styles["Header"]}>
            <div className={styles["profileCoverImage"]}>
                {loading ? (
                            <Stack spacing={1}>
                                <Skeleton variant="rectangular" width={'100%'} height={'300px'} />
                            </Stack>
                        ) : (
                            <img src={uploadedFileCover ? URL.createObjectURL(uploadedFileCover) : coverPic} className={styles["coverPhoto"]} alt="Cover Photo" />
                    )}
                        <button onClick={() => fileRefCover.current.click()} className={styles["CoverButton"]}><CameraAltRoundedIcon />⠀Edit Cover Photo
                                </button>
                            <input
                                    ref={fileRefCover}
                                    onChange={handleCoverUpload}
                                    type="file"
                                    style={{ display: 'none' }}
                                    accept=".png, .jpg, .jpeg"
                                />    
                    </div>
                <div className={styles["ProfileHeaderContainer"]}>
                    <div className={styles["userProfile"]}>
                        <div className={styles["profileImageContainer"]}>
                            {loading ? (
                                    <Stack spacing={1}>
                                        <Skeleton variant="circular" width={'150px'} height={'150px'} />
                                    </Stack>
                                ) : (
                                    <img src={uploadedFileProfile ? URL.createObjectURL(uploadedFileProfile) : profilePic} alt="User Profile" className={styles["profileImage"]} />
                                )}
                                <button onClick={() => fileRefProfile.current.click()} className={styles["ProfileButton"]}><CameraAltRoundedIcon />
                                    </button>
                                    <input
                                        ref={fileRefProfile}
                                        onChange={handleProfileUpload}
                                        type="file"
                                        style={{ display: 'none' }}
                                        accept=".png, .jpg, .jpeg"
                                    />
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

export default AccountEdit; 