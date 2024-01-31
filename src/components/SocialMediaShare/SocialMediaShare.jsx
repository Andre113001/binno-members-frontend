import React from 'react';
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';
import { Typography, Button } from '@mui/material';
import './SocialMediaShare.css';

import {
    Facebook,
    LinkedIn
} from '@mui/icons-material';

const SocialMediaShare = ({ id, type, setClose }) => {
    const url = `www.binnostartup.site/${id}`;
    console.log(url);

    const handleClose = () => {
        setClose(true);
    };

    return (
        <div className="blur-background" onClick={handleClose}>
            <div className="share-container">
                <Typography variant='h4' color={"white"} fontWeight={"bold"}>Share this {type}</Typography>
                <Typography color={'white'}>Help spread awareness of the Bicol Startup scene</Typography>
                {/* <Embed url='wordpress.com' /> */}
                <div className="social-media">
                    <FacebookShareButton url={url}> 
                        <Button startIcon={<Facebook />} sx={{backgroundColor:"#0965fe"}} variant='contained'>Facebook</Button>
                    </FacebookShareButton>
                    <LinkedinShareButton url={url}>
                        <Button startIcon={<LinkedIn />} sx={{backgroundColor:"#0077b5"}} variant='contained'>LinkedIn</Button>
                    </LinkedinShareButton>
                </div>
                <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, p: 2}}
                style={{
                    backgroundColor: "#ff7a00",
                }}
                onClick={handleClose}
                >
                Done
            </Button>
            </div>
        </div>
    );
};

export default SocialMediaShare;
