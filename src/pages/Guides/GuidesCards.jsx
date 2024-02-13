import React, { useState, useEffect } from 'react'
import styles from './GuidesCards.module.css'
import useLoadProfile from '../../hooks/useLoadProfile.jsx'
import Moment from 'react-moment'
import { Link, useNavigate } from 'react-router-dom'
import useAccessToken from '../../hooks/useAccessToken.jsx'

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import useHttp from '../../hooks/http-hook.js'

const GuideCards = (props) => {
    const [guides, setGuides] = useState([])
    const { sendRequest, isLoading } = useHttp();
    const profileData = props.profileData;
    const [loading, setLoading] = useState(true);
    const accessToken = useAccessToken();
    const navigate = useNavigate();

    useEffect(() => {
        const loadHeadingData = async () => {
            try {
                setLoading(true);
                if (profileData) {
                    const profile = await profileData
                    const fetchGuides = await fetch(
                        `${import.meta.env.VITE_BACKEND_DOMAIN}/programs/user/${profile.member_id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    )
                    fetchGuides.json().then((result) => {
                        setGuides(result)
                    })
                }
            }
            finally{
                setLoading(false);
            }
        }

        loadHeadingData()
    }, [profileData, accessToken])

    // console.log(guides);

    const handleDeleteGuide = async (e, id) => {
        e.stopPropagation();
  
        if (window.confirm("Are you sure you want to delete this Guide?")) {
          const res = await sendRequest({
            url: `${import.meta.env.VITE_BACKEND_DOMAIN}/programs/delete/${id}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify that you are sending JSON data
            },
            body: JSON.stringify({
                username: profileData.setting_institution
            })
          });
          
          console.log(res);
          if (res.message === 'Program deleted successfully') {
            window.location.reload();
          } else {
            alert("Delete Unsuccessful");
          }
        }
      } 

    return (
        <>
            <section className={styles['content']}>
                <div className={styles['grid2']}>
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                    <div className={styles['boxItems']} key={index}>
                        <Skeleton variant="rectangular" width="100%" height={300} />
                        <div className={styles['eventContent']}>
                        <div className={styles['details']}>
                            <Skeleton variant="text" width="80%" sx={{margin: '20px'}} />
                            <Skeleton variant="text" width="60%" sx={{margin: '20px'}}/>
                            <Skeleton variant="text" width="90%" sx={{margin: '20px'}} />
                        </div>
                        </div>
                    </div>
                    ))
                ) : (
                    guides.map((guide) => (
                        <div 
                            className={styles['guideContent']} 
                            key={guide.program_id}
                            onClick={() => navigate(`/guides/${guide.program_id}`)}
                        >
                            <div className={styles['guideImage']}>
                                <img src={`${import.meta.env.VITE_BACKEND_DOMAIN}/images?filePath=guide-pics/${guide.program_img}`} alt="" />
                            </div>
                            <div className={styles['guideFooter']}>
                                <div
                                    className={styles['TitleDateContainer']}
                                >
                                    <h2>{guide.program_heading}</h2>
                                    <span className={styles['guideDate']}>
                                        Last accessed:{' '}
                                        <Moment format='MMMM DD, YYYY'>
                                            {guide.program_datemodified}
                                        </Moment>
                                    </span>
                                </div>
                                <div className={styles['buttonContainer']}>
                                    <p>Click to View and Edit</p>
                                    <Stack 
                                        direction="row" 
                                        alignItems="center" 
                                        margin={'0 20px'}
                                    >
                                        <IconButton 
                                            aria-label="delete" 
                                            size="large"
                                            onClick={(e) => handleDeleteGuide(e, guide.program_id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                </div>
            </section>
        </>
    )
}

export default GuideCards
