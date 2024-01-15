import React, { useState, useEffect } from 'react'
import styles from './BlogCard.module.css'
import { blog } from '../../assets/data'
import useLoadProfile from '../../hooks/useLoadProfile'
import { Link, useNavigate } from 'react-router-dom'
import useAccessToken from '../../hooks/useAccessToken'

import { fetchImage } from '../../hooks/image-hook'

const BlogCards = () => {
    const [blogs, setBlogs] = useState([])
    const { profileData } = useLoadProfile()
    const accessToken = useAccessToken()
    const [imageSrc, setImageSrc] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        const loadHeadingData = async () => {
            if (profileData) {
                const profile = await profileData
                const guidesQuery = await fetch(
                    `https://binno-members-repo-production-b8c4.up.railway.app/api/blogs/user/${profile.member_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )
                
                const guidesResult = await guidesQuery.json()
                
                const promises = guidesResult.map(async (guide) => {
                    console.log(guide);
                    const blogPic = await fetchImage(guide.blog_img)
                    console.log(guide.blog_img)
                    const newBlob = new Blob([blogPic], { type: 'image/jpeg' });

                    return {...guide, blogPic: newBlob};
                });
                
                const results = await Promise.all(promises);

                setBlogs(results)

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
                                    <img src={URL.createObjectURL(blog.blogPic)} alt="" />
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
