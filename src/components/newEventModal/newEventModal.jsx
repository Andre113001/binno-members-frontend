import React, { useState, useEffect, useRef } from 'react'
import './newEventModal.css'
import PickDate from './datePicker';
import DropBox from '../dropbox/DropBox';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import useLoadProfile from '../../hooks/useLoadProfile';


export default function NewEventModal() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [title, setTitle] = useState('Write your heading here..') 
  const [description, setDescription]= useState()
  const [eventDate, setEventDate] = useState()
  const [uploadedFile, setUploadedFile] = useState()
  const [uploadError, setUploadError] = useState(null)
  const fileRef = useRef()

    const {profileData} = useLoadProfile()
    
    const handleFileUpload = async (e) => {
      const file = e.target.files[0]

      const isImage = file.type.split('/')[0] === 'image' ?? false

      if (!isImage) {
          setUploadError('The uploaded file is not a valid image.')
          return
      }

      if (!checkFileSize(file)) {
          setUploadError(
              'The image size exceeds the maximum allowed size of 5 MB.'
          )
          return
      }

      setUploadedFile(file)
      setUploadError(null)
      
      console.log('Uploaded File:', file);


      return []
  }

  const checkFileSize = (file) => {
    const fileSizeInMB = file.size / (1024 * 1024)

    if (fileSizeInMB > 5) {
        setUploadError(
            'The file size is too large. Please upload a file that is smaller than 5MB.'
        )
        return false
    }

    return true
}
    
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

  

    const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

    const handleSubmit = async () => {

      const formData = new FormData()

      formData.append('file_path', 'event-pics')
      formData.append('image', uploadedFile)

      console.log('ds')
      const imageRes = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/images/upload`,{
        method: 'POST',
        body: formData,
      })

      console.log('ddd')

      const imageData = await imageRes.json()
      console.log(imageData)

      const modifiedImageUrl = imageData.filePath.replace('/app/public/', '');


      const res = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/events/upload`,{
        method: 'POST',
        body: JSON.stringify({
          eventAuthor: profileData.member_id,
          eventDate: eventDate,
          eventTitle: title,
          eventDescription: description,
          eventImg: modifiedImageUrl

        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      console.log(data)
      toggleModal()
    }


    return (
    <>
    <button onClick={toggleModal} className="createEventBtn">
            <AddRoundedIcon/> Create new event
        </button>
          {modal && (
              <div className="eventModal">
                <div onClick={toggleModal} className="overlay"></div>
                  <div className="eventModalContent">
                      <div className="titleDateContainer">
                          <input 
                            type="text"
                            className='titleTextBox'
                            placeholder='Title'
                            onChange={handleTitleChange}
                            style={{margin: '10px', outline: 'none'}}
                            // value={eventTitle}
                            // onChange={(e) => setEventTitle(e.target.value)}
                          />
                      </div>
                      <button className="close-modal" onClick={toggleModal}>
                      <CloseRoundedIcon />
                      </button>
                      <div className="datepickerContainer">
                          <PickDate />
                          {/* eventDate={eventDate} onEventDateChange={handleDateChange} */}
                        </div>
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
                                    <TextField
                                      aria-label="empty textarea"
                                      placeholder="Write a short description"
                                      multiline
                                      style={{ maxHeight: '250px' ,width: '97.5%', border: 'rgb(241,241,241)', 
                                        margin: "15px 10px", backgroundColor:"rgb(241,241,241)", outline:'none'}}
                                      minRows={3}
                                      maxRows={5}
                                      onChange={handleDescriptionChange}
                                      // value={eventDescription}
                                      // onChange={(e) => setEventDescription(e.target.value)}
                                      inputProps={{ maxLength: 300 }}
                                    />
                                  </div>
                                </Box>
                          </div>
                      
                      <div className="eventModalDropboxContainer">
                        <DropBox uploadError={uploadError} uploadedFile={uploadedFile} fileRef={fileRef} onFileUpload={handleFileUpload} />
                      </div>
              
                      <button className='uploadButton' 
                        onClick={handleSubmit}
                        > 
                        Upload
                      </button>
                  </div>
            </div>
          )}
    </>
  )
}
