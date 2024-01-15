import React, { useState, useEffect } from 'react'
import useLoadProfile from '../../../../hooks/useLoadProfile'
import useAccessToken from '../../../../hooks/useAccessToken';
import { Link, useNavigate} from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import styles from './CompanyPostCards.module.css'


const PostCards = () => {
    const [posts, setPosts] = useState([])
    const { profileData } = useLoadProfile()
    const accessToken = useAccessToken()

    const fullDate = new Date(dateWithTime);
    const dateOnly = fullDate.toISOString().split('T')[0];

    const navigate = useNavigate()

    useEffect(() => {
        const loadHeadingData = async () => {
            if (profileData) {
                const profile = await profileData
                const fetchGuides = await fetch(
                    `https://binno-members-repo-production-b8c4.up.railway.app/api/posts/user/${profile.member_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )
                fetchGuides.json().then((result) => {
                    setPosts(result)
                })
            }
        }

        loadHeadingData()
    }, [profileData])


    console.log(posts)
return (
    <>
        <section className={styles["PostsPage"]}>     
            <div className={styles["titleContainer"]}>
                <h1>Recent Posts</h1>
                <Link to="/posts">View all posts...</Link>
            </div>
            <div className={styles["content"]}>
                {posts?.map((post)=> (
                    <Link to={`/posts/${post.post_id}`} 
                        onClick={(e)=>{
                            e.preventDefault()
                            navigate(`/posts/${post.post_id}`,
                            {state: {
                                post
                            }})
                        }}
                        key={post.post_id}
                        style={{ textDecoration: 'none', color: 'inherit'}}
                    >
                    <div className={styles["boxItems"]} > 
                        <div className={styles["userInfoContainer"]}>
                            <img src={post.userProfile} alt='' style={{margin: '20px',width: '60px',height:'auto',borderRadius: '50%'}}/>

                                <div className={styles["UserDateContainer"]}>
                                    <h3>{post.post_author}</h3>
                                    <p>{post.post_dateadded}</p>
                                </div>
                        </div>
                            <div className={styles["img"]}>
                                <img src={post.cover} alt='' />
                            </div>
                        <div className={styles["details"]}>
                            <h3>{post.post_heading}</h3>
                            <div className={styles['ChipsContiner']}>
                                <Stack direction="row" >
                                    <Chip
                                        label={post.post_category}
                                        sx={{
                                            backgroundColor: post.post_category === 'Milestone' ? '#fd7c06' : '#054eae',
                                            color: '#fff',
                                            padding: '5px',
                                        }}
                                    />
                                </Stack>
                            </div>
                            <p>{post.post_bodytext.slice(0,150)}...</p>    
                        </div>
                    </div>
                </Link>
                ))} 
            </div>
        </section>
    </>
  ) 
}

export default PostCards;