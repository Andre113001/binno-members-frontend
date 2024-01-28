import React, { useState , useEffect} from 'react'
import styles from './PanelContent.module.css'
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

import useLoadProfile from '../../hooks/useLoadProfile'
import useAccessToken from '../../hooks/useAccessToken'
import { Link, useNavigate } from 'react-router-dom';

import { fetchImage } from '../../hooks/image-hook'


function PanelContent(props) {
    const {filteredPosts}=props
    const [posts, setPosts] = useState(filteredPosts)
    const navigate = useNavigate()
    const accessToken = useAccessToken()
    const { profileData } = useLoadProfile()
    const [imageSrc, setImageSrc] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const pic = await fetchImage(profileData.setting_profilepic)
            setImageSrc(URL.createObjectURL(pic))
        try {
            setLoading(true);
            if (profileData) {
                const profile = await profileData
                const guidesQuery = await fetch(
                    `https://binno-members-repo-production-b8c4.up.railway.app/api/posts/user/${profile.member_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )

                const guidesResult = await guidesQuery.json()
                
                console.log(guidesResult)
                
                const promises = guidesResult.map(async (guide) => {
                    const postPic = await fetchImage(guide.post_img)
                    const profilePic = await fetchImage(profileData.setting_profilepic)
                        
                // const p1 = new Blob([postPic], { type: 'image/jpeg' });
                // const p2 = new Blob([profilePic], { type: 'image/jpeg' });
                        // console.log(p1, p2);
                        console.log({...guide, postPic: postPic, profilePic: profilePic})
                    return {...guide, postPic: postPic, profilePic: profilePic};
                });
                
                const results = await Promise.all(promises);

                setPosts(results)
                }
            }
            finally{
                setLoading(false);
            }
        }
        if(profileData)loadData()
    }, [profileData, accessToken])

  return (
    <>
        {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                    <div className={styles['boxItems']} key={index}>
                        <Skeleton variant="rectangular" alightItem="center" width="50%" height={300} />
                        <div className={styles['eventContent']}>
                        <div className={styles['details']}>
                            <Skeleton variant="text" width="80%" sx={{margin: '20px'}} />
                            <Skeleton variant="text" width="60%" sx={{margin: '20px'}}/>
                            <Skeleton variant="text" width="90%" sx={{margin: '20px'}} />
                        </div>
                        </div>
                    </div>
                    ))
                ) : (
                    posts?.map((post, index) => (
                        <div className={styles['PostContent']} key={index}>
                            <Link to={`/posts/${post.post_id}`} 
                                onClick={(e)=>{
                                    e.preventDefault()
                                    navigate(`/posts/${post.post_id}`,
                                    {state: {
                                        post
                                    }})
                            }}
                        key={post.post_id}
                        style={{textDecoration: 'none', color: 'inherit'}}
                    >
                    <div className={styles['PostCards']}>
                        <div className={styles['titleImageContainer']}>
                            <img src={post.postPic && URL.createObjectURL(post.postPic)} alt="" />
                        </div>
                            
                        <div className={styles['contentDetail']}>
                            <div className={styles['ShareCategoryContainer']}>
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
                                <Stack direction="row" alignItems="center">
                                    <IconButton size="medium">
                                        <ShareIcon/>
                                    </IconButton>
                                </Stack>
                            </div>
                            <div className={styles['contentHeading']}>
                                <div className={styles['titleContainer']}>
                                    <h2>{post.post_heading}</h2>
                                </div>
                                <p>{post.post_dateadded}</p>
                            </div>
                        <p>{post.post_bodytext}</p>
                            <div className={styles['contentFooter']}>
                                    <div className={styles["PostUserProfile"]}>
                                        <img src={post.profilePic} alt="User Profile"/>
                                        <h2>{post.post_author}</h2>
                                    </div>
                                <div >
                                    <p>Click to View and Edit</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    </Link>
                </div>
            ))
        )}
    </>
  )
}

export default PanelContent