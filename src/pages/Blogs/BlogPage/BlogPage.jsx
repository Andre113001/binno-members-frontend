import React, { useContext, useState, useEffect } from 'react'
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
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    blogTitle: '',
    blogContent: '',
  });

  // console.log(accountCtx.profileData);

  // useEffect(() => {
  //   const loadData = () => {
  //       if(receivedData) {
  //           setBlogData(receivedData.blog)
  //           setTitleInput(receivedData.blog.blog_title)
  //           setDescription(receivedData.blog.blog_content)
  //       }
  //   }
  //   loadData()
  // }, [receivedData])
  
  const handleChange = (e) => {
    setBlogData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async () => {

    const formData = new FormData()

    formData.append('file_path', 'blog-pics')
    formData.append('image', uploadedFile)

    const imageRes = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/images/upload`,{
      method: 'POST',
      body: formData,
    })

    const imageData = await imageRes.json()
    console.log(imageData)

    const modifiedImageUrl = imageData.filePath.replace('/app/public/', '');

    const res = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/blogs/post`,{
      method: 'POST',
      body: JSON.stringify({
        authorId: profileData.member_id,
        blogTitle: blogData.blogTitle,
        blogContent: blogData.blogContent,
        blogImg: modifiedImageUrl,
        username: profileData.setting_institution // needs to be dynamic
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json()
    if (data.message === "Blog created successfully"){
      navigate('/blogs')
    }
  }


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
                  <button className={styles['publishBtn']} style={{padding: 10, width: '100px'}} onClick={handleSubmit}>
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