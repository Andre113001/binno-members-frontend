import React, { useState, useEffect } from 'react'
import styles from './EventCard.module.css'
import useLoadProfile from '../../hooks/useLoadProfile'
import useAccessToken from '../../hooks/useAccessToken'
import { Link, useNavigate } from 'react-router-dom'

import { fetchImage } from '../../hooks/image-hook'

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Moment from 'react-moment';
import moment from 'moment/moment'
import 'moment-timezone';
import useHttp from '../../hooks/http-hook'

const Events = () => {
    const [events, setEvents] = useState([])
    const { profileData } = useLoadProfile()
    const accessToken = useAccessToken()
    const [imageSrc, setImageSrc] = useState()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {sendRequest, isLoading} = useHttp();

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

    const handleDeleteEvent = async (id, e) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this Event?")) {
          const res = await sendRequest({
            url: `${import.meta.env.VITE_BACKEND_DOMAIN}/events/delete/${id}`
          });
      
          if (res.message === 'Event deleted successfully') {
            window.location.reload();
          } else {
            alert("Delete Unsuccessful");
          }
        }
      } 

      const handleShowNoDataMessage = (hasData) => {
        // Display "No data yet" message when there are no events
        if (!hasData) {
            return (
                <div className={styles['noDataMessageContainer']}>
                    <ErrorOutlineIcon />
                    <div className={styles['noDataMessage']}>
                        No Events Added Yet
                    </div>
                </div>
            );
        }
        return null;
    }

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
                    events && events.length > 0 ? (
                        events?.map((event) => (
                            <div
                                className={styles['boxItems']}
                                key={event.event_id}
                                onClick={(e)=>{
                                    e.preventDefault()
                                    navigate(`/events/${event.event_id}`,
                                    {   state: {
                                        event
                                    },
                                });
                            }}
                            >
                                <div className={styles['img']}>
                                    <img src={URL.createObjectURL(event.eventPic)} alt="" />
                                </div>
                                <div className={styles['eventContent']}>
                                    <div className={styles['details']}>
                                        <h3>{event.event_title}</h3>
                                        <p>📍 {event.event_address}</p>
                                        <p>📅 <Moment format="MMMM DD, YYYY">{event.event_date}</Moment> ⌚{' '}
                                            {moment(event.event_time, 'HH:mm:ss').format('hh:mm A')}</p>
                                        <p>
                                            {event.event_description.slice(0, 250)}...<br/><span style={{color: '#fd7c06', marginTop: 10}}>Read more</span>
                                        </p>
                                        {/* <p style={{fontWeight: 'bold'}}>Uploaded <Moment>{event.event_datecreated}</Moment> ago</p>
                                        <p>{new Date().toString()}</p> */}
                                        <div
                                            className={
                                                styles['contentUserInfoContainer']
                                            }
                                        >
                                            <div className={styles['userProfileImg']}>
                                                <img  src={URL.createObjectURL(event.profilePic)} alt="" />
                                            </div>
                                            <p>{profileData.setting_institution}</p>
                                        </div>
                                    </div>
                                    <Stack direction="row" alignItems="center" margin={'0 20px'} onClick={(e) => handleDeleteEvent(event.event_id, e)}>
                                        <IconButton aria-label="delete" size="large">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </div>
                            </div>
                        ))
                    ) : (
                        handleShowNoDataMessage(false)
                    )
                )}
                </div>
            </section>
        </>
    )
}

export default Events
