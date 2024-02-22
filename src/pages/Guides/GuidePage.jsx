import React, { useState, useEffect } from 'react'

import Header from '../../components/header/Header'
import Back from '../../components/Back/Back'
import useAccessToken from '../../hooks/useAccessToken'

import { Link, useParams } from 'react-router-dom'
import GuideElements from './GuideElements'
import { AddPhotoAlternateOutlined } from '@mui/icons-material'

import { Chip, styled, Button, Alert, Snackbar } from '@mui/material'
import useHttp from '../../hooks/http-hook'
import axios from 'axios'


import './Guides.css'

const GuidePage = () => {
    const { program_id } = useParams()
    const [pageContents, setPageContents] = useState([])
    const [currentPage, setCurrentPage] = useState('')
    const [ programId, setProgramId ] = useState();
    const [ imgName, setImgName ] = useState();

    const [isSaved, setIsSaved] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for managing Snackbar open/close
    const [snackbarMessage, setSnackbarMessage] = useState(''); // State for managing Snackbar message
    const [snackbarStatus, setSnackbarStatus] = useState('error');
    
    const [backgroundImage, setBackgroundImage] = useState(
        'https://www.givenow.com.au/img/default-cover.png'
    )
    const accessToken = useAccessToken()
    const { sendRequest, isLoading } = useHttp();

    useEffect(() => {
        try {
            const loadPageData = async () => {
                const res = await sendRequest({ url: `${import.meta.env.VITE_BACKEND_DOMAIN}/programs/${program_id}`, 
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                
                setPageContents(res);
                setBackgroundImage(`${import.meta.env.VITE_BACKEND_DOMAIN}/images?filePath=guide-pics/${res.program_img}`);
                setProgramId(res.program_id);
                if (res.program_pages.length > 0) {
                    setCurrentPage(res.program_pages[0].program_pages_id);
                    setImgName(res.program_pages[0].program_img);
                } 
            }

            loadPageData()
        } catch (error) {
            console.log('Error Fetching Data: ', error.message)
        }
    }, [program_id])

    // console.log(imgName);

    // Callback function to update save status
    const updateSaveStatus = (status) => {
        setIsSaved(status)
    }

    const showAlert = () => {
        setSnackbarStatus('info');
        setSnackbarMessage('Please save your changes before navigating to another page.');
        setSnackbarOpen(true);
    }

    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleCoverPhoto = async (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setBackgroundImage(reader.result)
            }
            reader.readAsDataURL(file)
        }

        const fileAsbase64 = await readFileAsBase64(file);
        const uploadData = {
            image: fileAsbase64
        }

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/images/update?filePath=guide-pics/${pageContents.program_img}`, uploadData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set Content-Type for file uploads
            },
        })

        const requestData2 = {
            newCoverPic: res.data.imageName,
            id: programId
        }

        if (res.data.result === true) {
            const res2 = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/programs/change_img`, requestData2)

            console.log(res2.data);
        }
    }
    

    const handleAddPage = async () => {
        const uploadData = {
            pageProgramId: programId
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/programs/create_page`, uploadData);

            console.log(res.data);

            if (res.data === 'Page created successfully') {
                window.location.reload();
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    })

    // console.log("Page Contents: ", pageContents);
    // console.log("Current Page: ", currentPage);

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    severity={snackbarStatus}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            {pageContents ? (
                <div className="App">
                    <div className="layoutContainer">
                        <div className="Headline">
                            <Header />
                        </div>
                        <div className="page-view">
                            <div className="heading">
                                <div className="back">
                                    <Back link={'/guides'} />
                                </div>
                            </div>
                            <main className="page-body">
                                <div className="page-selector">
                                    <button 
                                        className="add-page-btn"
                                        onClick={handleAddPage}
                                    >
                                        + Add Page
                                    </button>
                                    <ul>
                                        {pageContents?.program_pages && pageContents.program_pages.length > 0 ? (
                                            pageContents?.program_pages.map((content, index) => (
                                                <li key={content.program_pages_id} className="pages">
                                                    <Link
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: 'black',
                                                        }}
                                                        onClick={() =>
                                                            isSaved
                                                                ? setCurrentPage(content.program_pages_id)
                                                                : showAlert()
                                                        }
                                                    >
                                                        {index + 1}. {content.program_pages_title}
                                                    </Link>
                                                </li>
                                            ))
                                        ) : (
                                            <h4>No pages yet</h4>
                                        )}
                                    </ul>
                                </div>
                                <div className="page-edit">
                                    <div className="page-title-sm">
                                        <p>
                                            {pageContents.program_heading}
                                        </p>
                                    </div>
                                    <div
                                        className="cover-photo"
                                        style={{
                                            backgroundImage: `url(${backgroundImage})`,
                                        }}
                                    >
                                        <div className="upload-cover-btn">
                                            <Button
                                                component="label"
                                                variant="filled"
                                                style={{
                                                    backgroundColor: '#424864',
                                                    color: 'white',
                                                    fontSize: 12,
                                                    borderRadius: 30,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                                startIcon={
                                                    <AddPhotoAlternateOutlined />
                                                }
                                            >
                                                Change Photo
                                                <VisuallyHiddenInput
                                                    onChange={handleCoverPhoto}
                                                    type="file"
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                    <GuideElements
                                        page={currentPage}
                                        updateSaveStatus={updateSaveStatus}
                                    />
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Loading...</h1>
                </div>
            )}
        </div>
    )
}

export default GuidePage
