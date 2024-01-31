import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'; 

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Header from '../../../components/header/Header'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import BlogImageUpload from '../../../components/blogImageUpload/blogImageUpload';
import useHttp from '../../../hooks/http-hook';
import axios from 'axios';

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
    const { sendRequest, isLoading } = useHttp()
    const [uploadedFile, setUploadedFile] = useState(null);
    const navigate = useNavigate();
    const [blogData, setBlogData] = useState({
      title: '',
      description: '',
  } );
  const [img, setImg] = useState('');

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
  };

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value)
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  };

  const handleImageChange = async (file) => {
    const base64 = await readFileAsBase64(file);
    setImg(base64);
  };

  useEffect(() => {
    const loadData = () => {
        if(receivedData) {
            setBlogData(receivedData.blog)
            setTitleInput(receivedData.blog.blog_title)
            setDescription(receivedData.blog.blog_content)
        }
    }
    loadData()
  }, [receivedData])
  


  const handleSubmit = async () => {

    const requestData = {
        blogId: blogData.blog_id,
        authorId: blogData.blog_author,
        blogTitle: titleInput,
        blogContent: titleDescription,
        username: 'BiNNO'
    };

    if (img !== blogData.blog_img) {
      requestData.blogImg = img
    } else {
      requestData.blogImg = blogData.blogPic
    }

    const res = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/blogs/post`, 
    requestData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Set Content-Type for file uploads
        },
    });
    
    if (res.data.message === 'Blog updated successfully') {
      navigate('/blogs')
    }


  };

  // console.log(blogData);

  return (
    <>
        <div className={styles['BlogPageContainer']}>
            <Header />
            <div className={styles['contentContainer']}>
                <div className={styles['ButtonContainer']}>
                  <div className={styles['backButtonContainer']}>
                    <Link to="/blogs" style={{textDecoration:'none'}}>
                    <button className={styles['backButton']} ><ArrowBackRoundedIcon />
                      <span style={{margin:'5px'}} disabled={isLoading}>Back</span>
                    </button>
                    </Link>
                  </div>

                  <button className={styles['publishBtn']} disabled={isLoading} onClick={handleSubmit}> {/* Update Functionality */}
                    Save Changes
                  </button>
                  
                </div>
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
                    <BlogImageUpload initialFile={blogData.blogPic} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}
                  onChange={handleImageChange}/>
                  </div>
                  <div className={styles['descriptionContainer']}>
                    <TextField
                      id='description'
                      value={titleDescription}
                      onChange={handleDescriptionChange}
                      multiline
                      InputProps={{
                        disableUnderline: true,
                      }}
                      variant='standard'
                      placeholder="What is it all about?"
                      style={{border: 'none', padding: '10px', fontSize: '18px', width:'98%'}}
                    />
                  </div>
                  </Box>
            </div>
        </div>
    </>
  )
}

export default BlogEdit;