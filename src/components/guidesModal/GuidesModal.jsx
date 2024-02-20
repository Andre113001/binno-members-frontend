import React, { useState, useEffect } from 'react'
import './GuidesModal.css'
import DropBox from '../dropbox/DropBox';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function GuideModal(props) {
    const profileData = props.profileData;
    const [isEditActive, setIsEditActive] = useState(true)
    const [initialImg, setInitialImg] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [img, setImg] = useState('');
    const navigate = useNavigate();
    const [guideTitle, setGuideTitle] = useState();

    const toggleEdit = () => {
      setIsEditActive((prev) => !prev);
    };

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
      setModal(!modal);
    };
    
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }  
    
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


    const handleSubmit = async () => {
      // e.prguideDefault();

      const formData = new FormData()
      
      formData.append('file_path', 'guide-pics')
      formData.append('image', uploadedFile)

      const imageRes = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/images/upload`,{
        method: 'POST',
        body: formData,
      });

      const imageData = await imageRes.json()

      console.log(imageData.filePath);
      const uploadData = {
        programAuthor: profileData.member_id,
        fileName: imageData.filePath,
        programTitle: guideTitle,
      }

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/programs/create_program`, uploadData);

      if (res.data.message === 'Program created successfully') {
        navigate(`/guides/${res.data.id}`);
      }
      
    };

    return (
    <>
    <button onClick={toggleModal} className="createGuideBtn">
            <AddRoundedIcon/> Create new guide
        </button>
          {modal && (
              <div className="guideModal">
                <div onClick={toggleModal} className="overlay"></div>
                  <div className="guideModalContent" onSubmit={handleSubmit}>
                      <div className="titleDateContainer">
                          <input 
                            type="text"
                            className='titleTextBox'
                            placeholder='Title' 
                            style={{height: '80px', margin: '10px', outline: 'none'}}
                            // value={guideTitle}
                            onChange={(e) => setGuideTitle(e.target.value)}
                          />
                      </div>
                      <button className="close-modal" onClick={toggleModal}>
                      <CloseRoundedIcon />
                      </button>
                          <div className="TextBoxContainer">
                            <Box
                                component="form"
                                sx={{
                                  '& .MuiTextField-root': { m: 1, width: '1250px' },
                                }}
                                noValidate
                                autoComplete="off"
                                >
                                  <div>
                                    <h3>Guide Cover Image</h3>
                                    {/* <TextField
                                      aria-label="empty textarea"
                                      placeholder="Write a short description"
                                      multiline
                                      style={{ maxHeight: '250px' ,width: '97.5%', border: 'rgb(241,241,241)', 
                                        margin: "15px 10px", backgroundColor:"rgb(241,241,241)", outline:'none'}}
                                      minRows={5}
                                      maxRows={7}
                                      // value={guideDescription}
                                      // onChange={(e) => setGuideDescription(e.target.value)}
                                      inputProps={{ maxLength: 300 }}
                                    /> */}
                                    <DropBox 
                                      uploadedFile={uploadedFile}
                                      setUploadedFile={setUploadedFile}
                                      initialFile={initialImg}
                                      onChange={handleImageChange}
                                    />
                                  </div>
                                </Box>
                          </div>
                      <button className='uploadButton' style={{marginTop: 10}} onClick={handleSubmit}> 
                        Create Guide
                      </button>
                  </div>
            </div>
          )}
    </>
  )
}
