import React, { useState, useEffect } from 'react'
import styles from './EventCard.module.css'
import useLoadProfile from '../../hooks/useLoadProfile'
import useAccessToken from '../../hooks/useAccessToken'
import { Link, useNavigate } from 'react-router-dom'

const Events = () => {
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

    console.log(events)

    return (
        <>
            <section className={styles['content']}>
                <div className={styles['grid2']}>
                    {events.map((event) => (
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
                            <div
                                className={styles['boxItems']}
                                key={event.event_id}
                            >
                                <div className={styles['img']}>
                                    <img src="" alt="" />
                                </div>
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
                                            <img src="" alt="" />
                                        </div>
                                        <p>{profileData.setting_institution}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Events
