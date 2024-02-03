import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'; 

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Header from '../../../components/header/Header'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DropBox from '../../../components/dropbox/DropBox';
import axios from 'axios';


import styles from './PostEdit.module.css'
import useLoadProfile from '../../../hooks/useLoadProfile';


function PostEdit() {
  const [uploadedFile, setUploadedFile] = useState()
  const [uploadError, setUploadError] = useState(null)
  const fileRef = useRef();
  const [initialImg, setInitialImg] = useState('');
  const {profileData} = useLoadProfile()
  const navigate = useNavigate()
  const location = useLocation()
  const receivedData = location.state
  const [titleInput, setTitleInput] = useState()
  const [titleDescription, setDescription] = useState()
  const [postData, setPostData] = useState({
    title: '',
    description: '',
  });
  const [img, setImg] = useState('');

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value)
  };
  

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  };


  useEffect(() => {
    const loadData = () => {
        if(receivedData){ 
            setPostData(receivedData.post)
            setInitialImg(receivedData.post.postPic)
            setTitleInput(receivedData.post.post_heading)
            setDescription(receivedData.post.post_bodytext)
          }
    }
    loadData()
  }, [receivedData])
  

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
  };
  
  const handleImageChange = async (file) => {
    const base64 = await readFileAsBase64(file);
    setImg(base64);
  };

  const handleSubmit = async() => {
    const requestData = {
      post_id: postData.post_id,
      postAuthor: postData.post_author,
      postCategory: postData.post_category,
      postHeading: titleInput,
      postText: titleDescription,
      username: postData.setting_institution
    };

    if (img !== initialImg) {
      requestData.postImg = img
    } else {
      requestData.postImg = initialImg
    }

    const res = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/posts/upload`, 
    requestData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Set Content-Type for file uploads
        },
    });
  
    if (res.data.message === 'Post updated successfully') {
      navigate('/posts')
    }
  };


  return (
    <>
        <div className={styles['EventPageContainer']}>
            <Header />
            <div className={styles['contentContainer']}>
                <div className={styles['ButtonContainer']}>
                  <div className={styles['backButtonContainer']}>
                    <Link to="/posts" style={{textDecoration:'none'}}>
                    <button className={styles['backButton']} ><ArrowBackRoundedIcon />
                      <span style={{margin:'5px'}}>Back</span>
                    </button>
                    </Link>
                  </div>
                  <button className={styles['publishBtn']} type='submit' onClick={() => {
                    handleSubmit()
                    }}>
                    Save Changes
                  </button>
                  
                </div>
                <form className={styles['formContainer']} onSubmit={handleSubmit}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '1000px' },
                  }}
                >
                  <div className={styles['titleContainer']}>
                    <input
                      id='title'
                      value={titleInput}
                      onChange={handleTitleChange}
                      placeholder="Enter your title here..."
                      style={{border: 'none', padding: '10px', fontSize: '40px', fontWeight: '700', width:'100%', outline:'none'}}
                    />
                  </div>
                  <div className={styles['ImageContainer']}>
                  <DropBox
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                    initialFile={initialImg}
                    onChange={handleImageChange}
                  />
                  </div>
                  <div className={styles['descriptionContainer']}>
                    <TextField
                      id='description'
                      value={titleDescription}
                      onChange={handleDescriptionChange}
                      multiline                  
                      variant='standard'
                      InputProps={{
                        disableUnderline: true,
                      }}
                      style={{border: 'none', padding: '10px', fontSize: '18px', width:'98%'}}
                    />
                  </div>
                  </Box>
                </form>
            </div>
        </div>
    </>
  )
}

  export default PostEdit;