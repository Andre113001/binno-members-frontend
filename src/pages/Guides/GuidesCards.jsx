import { useState, useEffect, Fragment } from 'react'
import styles from './GuidesCards.module.css'
import useLoadProfile from '../../hooks/useLoadProfile.jsx'
import Moment from 'react-moment'
import { Link, useNavigate } from 'react-router-dom'
import useAccessToken from '../../hooks/useAccessToken.jsx'

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import useHttp from '../../hooks/http-hook.js'
import { Button } from '@mui/material'

import useCustomSnackbar from '../../hooks/useCustomSnackbar'
import useCustomModal from '../../hooks/useCustomModal';

const GuideCards = (props) => {
    const [guides, setGuides] = useState([])
    const [selectedId, setSelectedID] = useState();
    const { sendRequest, isLoading } = useHttp();
    const profileData = props.profileData;
    const [loading, setLoading] = useState(true);
    const accessToken = useAccessToken();
    const navigate = useNavigate();

    const { handleClose: handleCloseSnackbar, showSnackbar, SnackbarComponent } = useCustomSnackbar();
    const { handleClose: handleCloseModal, handleOpen: handleOpenModal, CustomModal } = useCustomModal();

    useEffect(() => {
        const loadHeadingData = async () => {
            try {
                setLoading(true);
                if (profileData) {
                    const profile = await profileData
                    const fetchGuides = await fetch(
                        `${import.meta.env.VITE_BACKEND_DOMAIN}/programs/user/${profile.member_id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    )
                    fetchGuides.json().then((result) => {
                        setGuides(result)
                    })
                }
            }
            finally{
                setLoading(false);
            }
        }

        loadHeadingData()
    }, [profileData, accessToken])

    const handleDeleteGuide = async () => {
        const res = await sendRequest({
        url: `${import.meta.env.VITE_BACKEND_DOMAIN}/programs/delete/${selectedId}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify that you are sending JSON data
        },
        body: JSON.stringify({
            username: profileData.setting_institution
        })
        });

        if (res.message === 'Program deleted successfully') {
        handleCloseModal();
        showSnackbar('Guide Deleted Successfully', 'success');
        window.location.reload();
        } else {
        showSnackbar('Delete Unsuccessful', 'error');
        }
    } 

    return (
        <>
            <SnackbarComponent />
            <CustomModal
                handleOpen={handleOpenModal}
                handleClose={handleCloseModal}
                content = {
                    <Fragment>
                        <div className="modal-content">
                            <center>
                                <h1>Delete This Guide?</h1>
                                <h3>Are you sure to delete this Guide?</h3>
                                <div className="modal-button">
                                    <Button
                                    sx={{
                                        height: "80px",
                                        background: "#FF7A00",
                                        border: "1px solid #FF7A00",
                                        width: "280px",
                                        borderRadius: "10px",
                                        "&:hover": {
                                        background: "#FF7A00",
                                        },
                                        color: "#fff",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                    }}
                                    onClick={handleDeleteGuide}
                                    disabled={isLoading}
                                    >
                                        Confirm
                                    </Button>
                                    <Button
                                    sx={{
                                        height: "80px",
                                        border: "1px solid #000",
                                        width: "280px",
                                        borderRadius: "10px",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "#000",
                                    }}
                                    onClick={handleCloseModal}
                                    disabled={isLoading}
                                    >
                                    Cancel
                                    </Button>
                                </div>
                            </center>
                        </div>
                    </Fragment>
                }
            />
            <section className={styles['content']}>
                <div className={styles['grid2']}>
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                    <div className={styles['boxItems']} key={index}>
                        <Skeleton variant="rectangular" width="100%" height={300} />
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
                    guides.map((guide) => (
                        <div 
                            className={styles['guideContent']} 
                            key={guide.program_id}
                            onClick={() => navigate(`/guides/${guide.program_id}`)}
                        >
                            <div className={styles['guideImage']}>
                                <img src={`${import.meta.env.VITE_BACKEND_DOMAIN}/images?filePath=guide-pics/${guide.program_img}`} alt="" />
                            </div>
                            <div className={styles['guideFooter']}>
                                <div
                                    className={styles['TitleDateContainer']}
                                >
                                    <h2>{guide.program_heading}</h2>
                                    <span className={styles['guideDate']}>
                                        Last accessed:{' '}
                                        <Moment format='MMMM DD, YYYY'>
                                            {guide.program_datemodified}
                                        </Moment>
                                    </span>
                                </div>
                                <div className={styles['buttonContainer']}>
                                    <p>Click to View and Edit</p>
                                    <Stack 
                                        direction="row" 
                                        alignItems="center" 
                                        margin={'0 20px'}
                                    >
                                        <IconButton 
                                            aria-label="delete" 
                                            size="large"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedID(guide.program_id);
                                                handleOpenModal();
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                </div>
            </section>
        </>
    )
}

export default GuideCards
