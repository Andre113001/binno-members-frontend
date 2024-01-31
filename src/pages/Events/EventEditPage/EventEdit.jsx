import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'; 

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Header from '../../../components/header/Header'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DropBox from '../../../components/dropbox/DropBox';
import { 
  AdapterDayjs, 
  LocalizationProvider, 
  DatePicker 
} from '@mui/x-date-pickers';

import axios from 'axios';

import styles from './EventEdit.module.css'


function EventEdit(props) {
    const location = useLocation()
    const receivedData = location.state
    const [titleInput, setTitleInput] = useState('')
    const [titleDescription, setDescription] = useState('')
    const [eventData, setEventData] = useState({
      title: '',
      description: '',
    });
    const [initialImg, setInitialImg] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [img, setImg] = useState('');
    const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value)
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  };


  useEffect(() => {
    const loadData = () => {
        if(receivedData){ 
            setEventData(receivedData.event);
            setTitleInput(receivedData.event.event_title);
            setDescription(receivedData.event.event_description);
            setInitialImg(receivedData.event.eventPic);
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
  
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('eventId', eventData.event_id);
    formData.append('eventAuthor', eventData.event_author);
    formData.append('eventDate', '2024-01-30');
    formData.append('eventTime', '11:30:00');
    formData.append('eventLocation', 'Sorsi');
    formData.append('eventTitle', titleInput);
    formData.append('eventDescription', titleDescription);

    // Check if the new image is different from the old image
    if (img !== eventData.eventPic) {
      formData.append('eventImg', img);
    } else {
      // Use the old image if it hasn't changed
      // const oldImage = await readFileAsBase64(initialImg);
      formData.append('eventImg', initialImg);
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/events/post`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data', // Set Content-Type for file uploads
          },
      });
      
      if (res.data === true) {
        navigate('/events')
      }

    } catch (error) {
        console.error('Error uploading files:', error);
    }
  };

  return (
    <>
      <div className={styles['EventPageContainer']}>
        <Header />
        <div className={styles['contentContainer']}>
          <div className={styles['ButtonContainer']}>
            <div className={styles['backButtonContainer']}>
              <Link to="/events" style={{ textDecoration: 'none' }}>
                <button className={styles['backButton']}>
                  <ArrowBackRoundedIcon />
                  <span style={{ margin: '5px' }}>Back</span>
                </button>
              </Link>
            </div>

            <button
              className={styles['publishBtn']}
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
          <div className={styles['formContainer']}>
            <Box
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
                  style={{
                    border: 'none',
                    padding: '10px',
                    fontSize: '40px',
                    fontWeight: '700',
                    width: '100%',
                    outline: 'none',
                  }}
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

              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Date Picker" />
              </LocalizationProvider> */}

              <div className={styles['descriptionContainer']}>
                <TextField
                  id='description'
                  value={titleDescription}
                  onChange={handleDescriptionChange}
                  multiline
                  placeholder="What is it all about?"
                  style={{
                    border: 'none',
                    padding: '10px',
                    width: '98%',
                    outline: 'none',
                  }}
                  variant='standard'
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventEdit;