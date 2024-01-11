import React, { useState } from 'react'
import { Link } from 'react-router-dom'; 

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Header from '../../../components/header/Header'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import BlogImageUpload from '../../../components/blogImageUpload/blogImageUpload';

import styles from './BlogPage.module.css'

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

  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
  });

  
  const handleChange = (e) => {
    setBlogData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preDefault();
    const title = e.target.elements.title.value;
    // const category = e.target.elements.category.value;
    const description = e.target.elements.description.value;
    console.log('Form submitted:', { title, description});
    toggleModal();
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

                  <button className={styles['publishBtn']} type='submit'>
                    Publish
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
                      value={blogData.title}
                      onChange={handleChange}
                      placeholder="Enter your title here..."
                      style={{border: 'none', padding: '10px', fontSize: '40px', fontWeight: '600', width:'100%', outline:'none'}}
                    />
                  </div>
                  <div className={styles['UploadImage']}>
                    <BlogImageUpload />
                  </div>
                  <div className={styles['descriptionContainer']}>
                    <TextField
                      id='description'

                      value={blogData.description}
                      onChange={handleChange}
                      multiline
                      placeholder="What is it all about?"
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