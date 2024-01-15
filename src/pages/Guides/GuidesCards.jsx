import React, { useState, useEffect } from 'react'
import styles from './GuidesCards.module.css'
import useLoadProfile from '../../hooks/useLoadProfile.jsx'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import useAccessToken from '../../hooks/useAccessToken.jsx'

const GuideCards = () => {
    const [guides, setGuides] = useState([])
    const { profileData } = useLoadProfile()
    const accessToken = useAccessToken()

    useEffect(() => {
        const loadHeadingData = async () => {
            if (profileData) {
                const profile = await profileData
                const fetchGuides = await fetch(
                    `/api/programs/user/${profile.member_id}`,
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

        loadHeadingData()
    }, [profileData])

    // console.log(guides);

    return (
        <>
            <section className={styles['content']}>
                <div className={styles['grid2']}>
                    {guides.map((guide) => (
                        <Link
                            to={`/guides/${guide.program_id}`}
                            key={guide.program_id}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className={styles['guideContent']}>
                                {/* <Link to={`/`}></Link> */}
                                <div className={styles['guideImage']}>
                                    <img src="" alt="" />
                                </div>
                                <div className={styles['guideFooter']}>
                                    <div
                                        className={styles['TitleDateContainer']}
                                    >
                                        <h2>{guide.program_heading}</h2>
                                        <span className={styles['guideDate']}>
                                            Last accessed:{' '}
                                            <Moment>
                                                {guide.program_datemodified}
                                            </Moment>
                                        </span>
                                    </div>
                                    <p>Click to View and Edit</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}

export default GuideCards
