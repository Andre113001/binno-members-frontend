import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'; 

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Header from '../../../components/header/Header'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import BlogImageUpload from '../../../components/blogImageUpload/blogImageUpload';

import styles from './BlogEdit.module.css'

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


function BlogEdit(props) {
    const location = useLocation()
    const receivedData = location.state
    const [titleInput, setTitleInput] = useState()
      const [titleDescription, setDescription] = useState()
  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
  });


  const handleTitleChange = (event) => {
    setTitleInput(event.target.value)
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  };

  useEffect(() => {
    const loadData = () => {
        if(receivedData) {
            setBlogData(receivedData.event)
            setTitleInput(receivedData.blog.blog_title)
            setDescription(receivedData.blog.blog_content)
        }
    }
    loadData()
  }, [receivedData])
  
//   const handleChange = (e) => {
//     setBlogData((prevData) => ({
//       ...prevData,
//       [e.target.id]: e.target.value,
//     }));
//   };

  const handleSubmit = (e) => {
    e.preDefault();
    const title = e.target.elements.title.value;
    // const category = e.target.elements.category.value;
    const description = e.target.elements.description.value;
    console.log('Form submitted:', { title, description});
  };

  console.log(blogData)

  return (
    <>
        <div className={styles['BlogPageContainer']}>
            <Header />
            <div className={styles['contentContainer']}>
                <div className={styles['ButtonContainer']}>
                  <div className={styles['backButtonContainer']}>
                    <Link to="/blogs" style={{textDecoration:'none'}}>
                    <button className={styles['backButton']} ><ArrowBackRoundedIcon />
                      <span style={{margin:'5px'}}>Discard Changes</span>
                    </button>
                    </Link>
                  </div>

                  <button className={styles['publishBtn']} type='submit'>
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
                  <div className={styles['UploadImage']}>
                    <BlogImageUpload />
                  </div>
                  <div className={styles['descriptionContainer']}>
                    <TextField
                      id='description'
                      value={titleDescription}
                      onChange={handleDescriptionChange}
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

export default BlogEdit;