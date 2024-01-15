import React, { useState, useEffect } from 'react'
import './newEventModal.css'
import PickDate from './datePicker';
import DropBox from '../dropbox/DropBox';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import useLoadProfile from '../../hooks/useLoadProfile';


export default function NewEventModal() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isEditActive, setIsEditActive] = useState(true);
    const { profileData } = useLoadProfile();

    console.log(profileData);

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
    
    const [eventData, setEventData] = useState({
      eventTitle: '',
      eventDescription: '',
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted with data:', eventData);
    };

    return (
    <>
    <button onClick={toggleModal} className="createEventBtn">
            <AddRoundedIcon/> Create new event
        </button>
          {modal && (
              <div className="eventModal">
                <div onClick={toggleModal} className="overlay"></div>
                  <div className="eventModalContent" onSubmit={handleSubmit}>
                      <div className="titleDateContainer">
                          <input 
                            type="text"
                            className='titleTextBox'
                            placeholder='Title' 
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
                                      // value={eventDescription}
                                      // onChange={(e) => setEventDescription(e.target.value)}
                                      inputProps={{ maxLength: 300 }}
                                    />
                                  </div>
                                </Box>
                          </div>
                      
                      <div className="eventModalDropboxContainer">
                        <DropBox />
                      </div>
              
                      <button className='uploadButton' type='submit' onClick={toggleModal}> 
                        Upload
                      </button>
                  </div>
            </div>
          )}
    </>
  )
}
