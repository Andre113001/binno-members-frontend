import React, { useState, useEffect } from 'react'
import styles from './BlogCard.module.css'
import useLoadProfile from '../../hooks/useLoadProfile'
import { Link, useNavigate } from 'react-router-dom'
import useAccessToken from '../../hooks/useAccessToken'

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import { fetchImage } from '../../hooks/image-hook'

const BlogCards = () => {
    const [blogs, setBlogs] = useState([])
    const { profileData } = useLoadProfile()
    const accessToken = useAccessToken()
    const [imageSrc, setImageSrc] = useState()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const loadHeadingData = async () => {
            try {
                setLoading(true);
                if (profileData) {
                  const profile = await profileData;
                  const guidesQuery = await fetch(
                    `${import.meta.env.VITE_BACKEND_DOMAIN}/blogs/user/${profile.member_id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                      },
                    }
                  );
        
                  const guidesResult = await guidesQuery.json();
        
                  const promises = guidesResult.map(async (guide) => {
                    const blogPic = await fetchImage(`blog-pics/${guide.blog_img}`);
                    const newBlob = new Blob([blogPic], { type: 'image/jpeg' });
        
                    return { ...guide, blogPic: newBlob };
                  });
        
                  const results = await Promise.all(promises);
        
                  setBlogs(results);
                }
              } 
                finally {
                    setLoading(false);
                }
            };
        
            loadHeadingData();
        }, [profileData, accessToken]);
        
    console.log(blogs)

    return (
        <>
            <section className={styles['content']}>
                <div className={styles['grid2']}>
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                        <div className={styles['boxItems']} key={index}>
                            <Skeleton variant="rectangular" width="100%" height={300} />
                            <div className={styles['blogContent']}>
                            <div className={styles['details']}>
                                <Skeleton variant="text" width="80%" sx={{margin: '20px'}} />
                                <Skeleton variant="text" width="60%" sx={{margin: '20px'}}/>
                                <Skeleton variant="text" width="90%" sx={{margin: '20px'}} />
                            </div>
                            </div>
                        </div>
                        ))
                    ) : (
                        blogs?.map((blog) => (
                            <Link to={`/blogs/${blog.blog_id}`} 
                                onClick={(e)=>{
                                    e.preventDefault()
                                    navigate(`/blogs/${blog.blog_id}`,
                                    {state: {
                                        blog,
                                    },
                                    });
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
                                <div className={styles['blogContent']}>
                                    <div className={styles['details']}>
                                        <div className={styles['titleDeleteContainer']}>
                                            <h3>{blog.blog_title}</h3>
                                            <Stack direction="row" alignItems="center" margin={'0 20px'}>
                                                <IconButton aria-label="delete" size="large">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </div>
                                        <p>{blog.blog_content.slice(0, 250)}...</p>
                                        
                                
                                            <div className={styles['DateShareContainer']}>
                                                <div className={styles['date']}>
                                                    <h4>{blog.blog_dateadded}</h4>
                                                </div>
                                            <Stack direction="row" alignItems="center" sx={{marginRight: '20px'}}>
                                                <IconButton size="large">
                                                    <ShareIcon/>
                                                </IconButton>
                                            </Stack>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        ))
                    )}
                </div>
            </section>
        </>
    )
}

export default BlogCards
