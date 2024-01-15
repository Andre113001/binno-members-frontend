import React, { useState, useEffect } from 'react'
import styles from './BlogCard.module.css'
import { blog } from '../../assets/data'
import useLoadProfile from '../../hooks/useLoadProfile'
import { Link, useNavigate } from 'react-router-dom'
import useAccessToken from '../../hooks/useAccessToken'

const BlogCards = () => {
    const [blogs, setBlogs] = useState([])
    const { profileData } = useLoadProfile()
    const accessToken = useAccessToken()

    const navigate = useNavigate()

    useEffect(() => {
        const loadHeadingData = async () => {
            if (profileData) {
                const profile = await profileData
                const fetchGuides = await fetch(
                    `${import.meta.env.VITE_BACKEND_DOMAIN}/blogs/user/${profile.member_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )
                fetchGuides.json().then((result) => {
                    setBlogs(result)
                })
            }
        }

        loadHeadingData()
    }, [profileData])

    console.log(blogs)

    return (
        <>
            <section className={styles['content']}>
                <div className={styles['grid2']}>
                    {blogs.map((blog) => (
                        <Link to={`/blogs/${blog.blog_id}`} 
                            onClick={(e)=>{
                                e.preventDefault()
                                navigate(`/blogs/${blog.blog_id}`,
                                {state: {
                                    blog
                                }})
                        }}
                        key={blog.blog_id}
                        style={{ textDecoration: 'none', color: 'inherit'}}>
                            <div
                                className={styles['boxItems']}
                                key={blog.blog_id}
                            >
                                <div className={styles['img']}>
                                    <img src="" alt="" />
                                </div>
                                <div
                                    className={
                                        styles['contentUserInfoContainer']
                                    }
                                >
                                    <h2>{profileData.setting_institution}</h2>
                                    <h4>{profileData.user_type}</h4>
                                </div>
                                <div className={styles['details']}>
                                    <h3>{blog.blog_title}</h3>
                                    <p>{blog.blog_content.slice(0, 250)}...</p>
                                    <div className={styles['date']}>
                                        <h4>{blog.blog_dateadded}</h4>
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

export default BlogCards
