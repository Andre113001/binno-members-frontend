import React from 'react'
import { events } from '../../../../assets/events'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import styles from './CompanyEventCard.module.css'
import { Link } from 'react-router-dom';

const CompanyEvents = () => {
  return (
    <>
        <section className={styles['EventPage']}>
            <div className={styles["PageHeaderContainer"]}>
                <h2>Current & Upcoming Events</h2>
                <Link to="/events">View all Events...</Link>
            </div>
            
            <hr />
            <div className={styles["content"]}>
                {events?.map((item)=> (
                // Link
                <div className={styles['boxItems']} key={item.id}> 
                    <div className={styles["details"]}>
                        <div className={styles["eventDateContainer"]}>
                            <div className={styles["ContentTitleContainer"]}>
                                <a href=""><h3>{item.title}</h3>
                                </a>
                            </div>
                            <div className={styles['date']}>
                                    <h4>{item.date}</h4>
                            </div>
                        </div>
                        <p>{item.desc?.slice(0,250)}...</p>
                    </div>
                    </div>

                ))}

            </div>
        </section>
    </>
  ) 
}

export default CompanyEvents;