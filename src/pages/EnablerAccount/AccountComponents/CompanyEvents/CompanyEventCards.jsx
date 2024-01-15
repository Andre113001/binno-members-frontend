import React, { useState, useEffect } from 'react'
import useLoadProfile from '../../../../hooks/useLoadProfile'
import useAccessToken from '../../../../hooks/useAccessToken';
import { Link, useNavigate} from 'react-router-dom';

import styles from './CompanyEventCard.module.css'


const CompanyEvents = () => {
    const [events, setEvents] = useState([])
    const { profileData } = useLoadProfile()
    const accessToken = useAccessToken()

    const navigate = useNavigate()

    useEffect(() => {
        const loadHeadingData = async () => {
            if (profileData) {
                const profile = await profileData
                const fetchGuides = await fetch(
                    `https://binno-members-repo-production-b8c4.up.railway.app/api/events/user/${profile.member_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )
                fetchGuides.json().then((result) => {
                    setEvents(result)
                })
            }
        }

        loadHeadingData()
    }, [profileData])


  return (
    <>
        <section className={styles['EventPage']}>
            <div className={styles["PageHeaderContainer"]}>
                <h2>Current & Upcoming Events</h2>
                <Link to="/events">View all Events...</Link>
            </div>
            
            <hr />
            <div className={styles["content"]}>
                {events?.map((event)=> (
                <Link to={`/events/${event.event_id}`} 
                        onClick={(e)=>{
                            e.preventDefault()
                            navigate(`/events/${event.event_id}`,
                            {state: {
                                event
                            }})
                    }}
                    key={event.event_id}
                    style={{ textDecoration: 'none', color: 'inherit'}}
                >
                <div className={styles['boxItems']} key={event.event_id}> 
                    <div className={styles["details"]}>
                        <div className={styles["eventDateContainer"]}>
                            <div className={styles["ContentTitleContainer"]}>
                                <a href=""><h3>{event.event_title}</h3>
                                </a>
                            </div>
                            <div className={styles['date']}>
                                    <h4>{event.event_datecreated}</h4>
                            </div>
                        </div>
                        <p>{event.event_description?.slice(0,250)}...</p>
                    </div>
                </div>
                </Link>
                ))}
            
            </div>
        </section>
    </>
  ) 
}

export default CompanyEvents;