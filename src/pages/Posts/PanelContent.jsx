import React, { useState , useEffect} from 'react'
import styles from './PanelContent.module.css'
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import useLoadProfile from '../../hooks/useLoadProfile'
import useAccessToken from '../../hooks/useAccessToken'
import { Link, useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import { Delete } from '@mui/icons-material'
import useHttp from '../../hooks/http-hook';

import { fetchImage } from '../../hooks/image-hook'
import SocialMediaShare from '../../components/SocialMediaShare/SocialMediaShare';


function PanelContent(props) {
    const {filteredPosts} = props
    const navigate = useNavigate()
    const { sendRequest } = useHttp()
    const [showShareComponent, setShowShareComponent] = useState(false);
    const [ postId, setPostId ] = useState();

    const closeShareComponent = () => {
        setShowShareComponent(false);
    };

    const showShare = (e, id) => {
        e.stopPropagation();
        setPostId(id);
        setShowShareComponent(true);
    }

    const handleDeletePost = async (id, username, e) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this Post?")) {
          const res = await sendRequest({
            url: `${import.meta.env.VITE_BACKEND_DOMAIN}/posts/delete`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify that you are sending JSON data
            },
            body: JSON.stringify({
                post_id: id,
                username: username
            })
          });
      
          if (res.message === 'Post deleted successfully') {
            window.location.reload();
          } else {
            alert("Delete Unsuccessful");
          }
        }   
    } 

    return (
        <>
        {showShareComponent && <SocialMediaShare type={"Blog"} id={`blog/${postId}`} setClose={closeShareComponent} />}
            {filteredPosts?.map((post, index) => {
                return (
                <div className={styles['PostContent']} key={post.post_id} >
                    <div className={styles['PostCards']} style={{cursor: 'pointer'}} onClick={(e)=>{
                        e.preventDefault()
                        navigate(`/posts/${post.post_id}`,
                        {state: {
                            post
                        }})
                    }}>
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
                                <Stack direction="row" alignItems="center" onClick={(e) => handleDeletePost(post.post_id, post.author, e)}>
                                    <IconButton size="medium">
                                        <Delete />
                                    </IconButton>
                                </Stack>
                                <Stack direction="row" alignItems="center" onClick={(e) => showShare(e, post.post_id)}>
                                    <IconButton size="medium">
                                        <ShareIcon/>
                                    </IconButton>
                                </Stack>
                            </div>
                            <div className={styles['contentHeading']}>
                                <div className={styles['titleContainer']}>
                                    <h2>{post.post_heading}</h2>
                                </div>
                                <p><Moment format='MMMM DD, YYYY | HH:mm A'>{post.post_dateadded}</Moment></p>
                            </div>
                            <p>
                                {post.post_bodytext
                                    .split(' ')
                                    .slice(0, 50)
                                    .join(' ')}
                                <span style={{color: '#fd7c06'}}>{post.post_bodytext.split(' ').length > 50 ? '... See More' : ''}</span>
                            </p>
                            <div className={styles['contentFooter']}>
                                    <div className={styles["PostUserProfile"]}>
                                        <img src={URL.createObjectURL(post.profilePic)} alt="User Profile"/>
                                        <h2>{post.author}</h2>
                                    </div>
                            </div>

                        </div>
                    </div>
                </div>
                )
            })}
        </>
    )
}

export default PanelContent