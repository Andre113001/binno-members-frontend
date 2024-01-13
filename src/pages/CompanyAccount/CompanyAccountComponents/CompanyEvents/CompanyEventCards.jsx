import React from 'react'
// import { events } from '../../assets/data'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import styles from './CompanyEventCard.module.css'
import { Link } from 'react-router-dom';

const Events = () => {
  return (
    <>
        <section className={styles['EventPage']}>
            <div className={styles["PageHeaderContainer"]}>
                <h1>Current & Upcoming Events</h1>
                <a href="">View all Events...</a>
            </div>
            
            <hr />
            <div className={styles["content"]}>
                {events.map((item)=> (
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
                        <p>{item.desc.slice(0,250)}...</p>
                    </div>
                    </div>

                ))}

            </div>
        </section>
    </>
  ) 
}

export default Events;