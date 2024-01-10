import React, { useState } from 'react'
import { Link } from 'react-router-dom'; 

import Header from '../../../components/header/Header'
import ImageUpload from '../../../components/ImageUpload/ImageUpload.jsx'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import './BlogPage.css'

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
        <div className="BlogPageContainer">
            <Header />
            
            <div className="contentContainer">
                <div className="ButtonContainer">
                  <div className="backButtonContainer">
                    <Link to="/blogs" style={{textDecoration:'none'}}>
                    <button className='backButton' ><ArrowBackRoundedIcon />
                      <span style={{margin:'5px'}}>Back</span>
                    </button>
                    </Link>
                  </div>

                  <button className='publishBtn' type='submit'>
                    Publish
                  </button>
                  
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="titleContainer">
                    <input
                      id='title'
                      type="text"
                      value={blogData.title}
                      onChange={handleChange}
                      placeholder="Enter your title here..."
                      style={{border: 'none', padding: '10px', fontSize: '30px', fontWeight: '600', width:'100%', outline:'none'}}
                    />
                  </div>
                  <div className="UploadImage">
                    <h1>Insert DND</h1>
                  </div>
                  <div className="descriptionContainer">
                    <input
                      id='description'
                      type="text"
                      value={blogData.description}
                      onChange={handleChange}
                      placeholder="What is it all about?"
                      style={{border: 'none', padding: '10px', fontSize: '20px', width:'100%', outline:'none'}}
                    />
                  </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default BlogPage;