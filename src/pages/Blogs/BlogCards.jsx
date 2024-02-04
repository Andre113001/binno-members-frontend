import React, { useState, useEffect } from 'react'
import styles from './BlogCard.module.css'
import useLoadProfile from '../../hooks/useLoadProfile'
import { Link, useNavigate } from 'react-router-dom'
import useAccessToken from '../../hooks/useAccessToken'
import SocialMediaShare from '../../components/SocialMediaShare/SocialMediaShare';
import Moment from 'react-moment'

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import { fetchImage } from '../../hooks/image-hook'
import useHttp from '../../hooks/http-hook'

const BlogCards = () => {
    const { sendRequest, isLoading } = useHttp();
    const [blogs, setBlogs] = useState([])
    const { profileData } = useLoadProfile()
    const accessToken = useAccessToken()
    const [imageSrc, setImageSrc] = useState()
    const [loading, setLoading] = useState(true);
    const [showShareComponent, setShowShareComponent] = useState(false);
    const navigate = useNavigate()
    const [ blogId, setBlogId ] = useState();

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

    const closeShareComponent = () => {
        setShowShareComponent(false);
    };

    const showShare = (e, id) => {
        e.stopPropagation();
        setBlogId(id);
        setShowShareComponent(true);
    }

    const handleDeleteBlog = async (e, id) => {
        console.log("delete clicked", id);
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this Blog?")) {
            const res = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_DOMAIN}/blogs/delete`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify that you are sending JSON data
                },
                body: JSON.stringify({
                    blogId: id,
                    username: profileData.setting_institution
                })
            });
        
            if (res.message === 'Blog deleted successfully') {
              window.location.reload();
            } else {
              alert("Delete Unsuccessful");
            }
        }
    }

    return (
        <>
            {showShareComponent && <SocialMediaShare type={"Blog"} id={`blog/${blogId}`} setClose={closeShareComponent} />}
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
                            <div
                                onClick={() => navigate(`/blogs/${blog.blog_id}`, {
                                    state: { blog },
                                })}
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
                                            <Stack direction="row" alignItems="center" sx={{marginRight: '20px'}} onClick={(e) => showShare(e, blog.blog_id)}>
                                                <IconButton size="large">
                                                    <ShareIcon/>
                                                </IconButton>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" margin={'0 20px'} onClick={(e) => handleDeleteBlog(e, blog.blog_id)}>
                                                <IconButton aria-label="delete" size="large">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </div>
                                        <p>Published: <Moment format='MMMM DD, YYYY'>{blog.blog_dateadded}</Moment></p>
                                        <p>{blog.blog_content.slice(0, 250)}...</p>
                                    </div>
                                </div>
                            </div>
                        // </Link>
                        ))
                    )}
                </div>
            </section>
        </>
    )
}

export default BlogCards
