import React, { useState, useEffect } from 'react'
import styles from './EventCard.module.css'
import useLoadProfile from '../../hooks/useLoadProfile'
import useAccessToken from '../../hooks/useAccessToken'
import { Link, useNavigate } from 'react-router-dom'

import { fetchImage } from '../../hooks/image-hook'

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const Events = () => {
    const [events, setEvents] = useState([])
    const { profileData } = useLoadProfile()
    const accessToken = useAccessToken()
    const [imageSrc, setImageSrc] = useState()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()


    useEffect(() => {
        const loadHeadingData = async () => {
            try {
                setLoading(true);
                if (profileData) {
                    const profile = await profileData
                    const guidesQuery = await fetch(
                        `${import.meta.env.VITE_BACKEND_DOMAIN}/events/user/${profile.member_id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    )

                    const guidesResult = await guidesQuery.json()
                    
                    
                    const promises = guidesResult.map(async (guide) => {
                        const eventPic = await fetchImage(`event-pics/${guide.event_img}`)
                        const profilePic = await fetchImage(`profile-img/${profileData.setting_profilepic}`)
                
                    return {...guide, eventPic: eventPic, profilePic: profilePic};
                });
                
                const results = await Promise.all(promises);

                setEvents(results)
                }
            }  
            finally {
                setLoading(false);
            }
        };

        loadHeadingData()
    }, [profileData, accessToken]);
    

    console.log(events)

    return (
        <>
            <section className={styles['content']}>
                <div className={styles['grid']}>
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
                    events?.map((event) => (
                        <Link to={`/events/${event.event_id}`} 
                            onClick={(e)=>{
                                e.preventDefault()
                                navigate(`/events/${event.event_id}`,
                                {state: {
                                    event
                                },
                                });
                        }}
                        key={event.event_id}
                        style={{ textDecoration: 'none', color: 'inherit'}}
                        >
                            <div
                                className={styles['boxItems']}
                                key={event.event_id}
                            >
                                <div className={styles['img']}>
                                    <img src={URL.createObjectURL(event.eventPic)} alt="" />
                                </div>
                                <div className={styles['eventContent']}>
                                    <div className={styles['details']}>
                                        <div className={styles['date']}>
                                            <h4>{event.event_datecreated}</h4>
                                        </div>
                                        <h3>{event.event_title}</h3>
                                        <p>
                                            {event.event_description.slice(0, 250)}...
                                        </p>
                                        <div
                                            className={
                                                styles['contentUserInfoContainer']
                                            }
                                        >
                                            <div className={styles['userProfileImg']}>
                                                <img src={URL.createObjectURL(event.profilePic)} alt="" />
                                            </div>
                                            <p>{profileData.setting_institution}</p>
                                        </div>
                                    </div>
                                    <Stack direction="row" alignItems="center" margin={'0 20px'}>
                                        <IconButton aria-label="delete" size="large">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
                </div>
            </section>
        </>
    )
}

export default Events
