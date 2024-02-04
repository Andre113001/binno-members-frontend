import React, { useState, useEffect } from 'react'
import useAccessToken from '../../../../hooks/useAccessToken';
import { Link, useNavigate} from 'react-router-dom';
import Moment from 'react-moment';

import styles from './CompanyEventCard.module.css'


const CompanyEvents = (props) => {
    const [events, setEvents] = useState([])
    const profileData = props.profileData;
    const accessToken = useAccessToken()

    const navigate = useNavigate()

    useEffect(() => {
        const loadHeadingData = async () => {
            if (profileData) {
                const profile = await profileData
                const fetchGuides = await fetch(
                    `${import.meta.env.VITE_BACKEND_DOMAIN}/events/user/${profile.member_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )
                fetchGuides.json().then((result) => {
                    const firstTwoResults = result.slice(0, 4);
                    setEvents(firstTwoResults)
                })
            }
        }

        loadHeadingData()
    }, [profileData])


  return (
    <>
        <section className={styles['EventPage']}>
            <div className={styles["PageHeaderContainer"]}>
                <h2>Recent Events</h2>
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
                                    <h4><Moment format='MMMM DD, YYYY'>{event.event_date}</Moment></h4>
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