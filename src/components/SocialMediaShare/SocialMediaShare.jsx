import React from 'react';
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';
import { Typography, Button } from '@mui/material';
import './SocialMediaShare.css';

const SocialMediaShare = ({ postId }) => {
    const url = `binnostartup.org/post/${postId}`;

    return (
        <div className="blur-background">
            <div className="share-container">
                <Typography variant='h4' color={"white"} fontWeight={"bold"}>Share this post</Typography>
                <Typography color={'white'}>Help spread awareness of the Bicol Startup scene</Typography>
                {/* <Embed url='wordpress.com' /> */}
                <div className="social-media">
                    <FacebookShareButton url={url}> 
                        <FacebookIcon round size={100}/>
                    </FacebookShareButton>
                    <LinkedinShareButton url={url}>
                        <LinkedinIcon round size={100}/>
                    </LinkedinShareButton>
                </div>
                <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, p: 2}}
                style={{
                    backgroundColor: "#ff7a00",
                }}
                >
                Done
            </Button>
            </div>
        </div>
    );
};

export default SocialMediaShare;
