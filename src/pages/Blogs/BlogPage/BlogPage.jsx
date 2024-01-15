import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'; 

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Header from '../../../components/header/Header'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import BlogImageUpload from '../../../components/blogImageUpload/blogImageUpload';

import styles from './BlogPage.module.css'
import axios from 'axios';
import useLoadProfile from '../../../hooks/useLoadProfile';
import AccountContext from '../../../context/accountContext';

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });


function BlogPage() {
  const accountCtx = useContext(AccountContext);
  const [uploadedFile, setUploadedFile] = useState()
  const { profileData } = useLoadProfile();

  const [blogData, setBlogData] = useState({
    blogTitle: '',
    blogContent: '',
  });

  console.log(accountCtx.profileData);

  
  const handleChange = (e) => {
    setBlogData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      // const formData = new FormData();
      // // const data = {...blogData, file: uploadedFile }

      // formData.append('blogTitle', blogData.blogTitle);
      // formData.append('blogContent', blogData.blogContent);
      // formData.append('file', uploadedFile);

      // console.log(formData);

      // const res = await axios('/api/blogs/post')
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
        <div className={styles['BlogPageContainer']}>
            <Header />
            <div className={styles['contentContainer']}>
                <div className={styles['ButtonContainer']}>
                  <div className={styles['backButtonContainer']}>
                    <Link to="/blogs" style={{textDecoration:'none'}}>
                    <button className={styles['backButton']} ><ArrowBackRoundedIcon />
                      <span style={{margin:'5px'}}>Back</span>
                    </button>
                    </Link>
                  </div>
                </div>
                <form className={styles['formContainer']} onSubmit={handleSubmit}>
                <button className={styles['publishBtn']} type='submit'>
                    Publish
                </button>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '1000px' },
                  }}
                >
                  <div className={styles['titleContainer']}>
                    <input
                      id='blogTitle'
                      value={blogData.blogTitle}
                      onChange={handleChange}
                      placeholder="Enter your title here..."
                      style={{border: 'none', padding: '10px', fontSize: '40px', fontWeight: '700', width:'100%', outline:'none'}}
                    />
                  </div>
                  <div className={styles['UploadImage']}>
                    <BlogImageUpload
                      uploadedFile={uploadedFile}
                      setUploadedFile={setUploadedFile}
                    />
                  </div>
                  <div className={styles['descriptionContainer']}>
                    <TextField
                      id='blogContent'

                      value={blogData.blogContent}
                      onChange={handleChange}
                      multiline
                      placeholder="Tell us about it..."
                      style={{border: 'none', padding: '10px', fontSize: '18px', width:'98%', outline:'none'}}
                      minRows={6}
                      maxRows={7}
                    />
                  </div>
                  </Box>
                </form>
            </div>
        </div>
    </>
  )
}

export default BlogPage;