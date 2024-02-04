import React, { useState, useEffect } from 'react'
import useAccessToken from '../../../../hooks/useAccessToken';
import { Link, useNavigate} from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Moment from 'react-moment';

import styles from './CompanyPostCards.module.css'


const PostCards = (props) => {
    const [posts, setPosts] = useState([])
    const profileData = props.profileData;
    const accessToken = useAccessToken()

    const fullDate = new Date();

    const navigate = useNavigate()

    useEffect(() => {
        const loadHeadingData = async () => {
            if (profileData) {
                const profile = await profileData;
                const fetchGuides = await fetch(
                    `${import.meta.env.VITE_BACKEND_DOMAIN}/posts/user/${profile.member_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                fetchGuides.json().then((result) => {
                    const firstTwoResults = result.slice(0, 2);
                    setPosts(firstTwoResults)
                })
            }
        };
    
        loadHeadingData();
    }, [profileData, accessToken]);


    console.log(posts)
return (
    <>
        <section className={styles["PostsPage"]}>     
            <div className={styles["titleContainer"]}>
                <h1>Recent Posts</h1>
                <Link to="/posts">View all posts...</Link>
            </div>
            {posts.length > 0 ? (
            <div className={styles["content"]}>
                {posts.map((post)=> (
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
                            <img src={`${import.meta.env.VITE_BACKEND_DOMAIN}/images?filePath=profile-img/${profileData.setting_profilepic}`} alt='' style={{margin: '20px',width: '60px',height:'auto',borderRadius: '50%'}}/>

                                <div className={styles["UserDateContainer"]}>
                                    <h3>{profileData.setting_institution}</h3>
                                    <p><Moment format='MMMM DD, YYYY'>{post.post_dateadded}</Moment></p>
                                </div>
                        </div>
                        <div className={styles["img"]}>
                            <img src={`${import.meta.env.VITE_BACKEND_DOMAIN}/images?filePath=post-pics/${post.post_img}`} alt='' />
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
                ))
            } 
            </div> 
            ) : (
                <div>No Posts</div>
            ) }
            
        </section>
    </>
  ) 
}

export default PostCards;