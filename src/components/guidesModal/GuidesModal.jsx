import React, { useState, useEffect } from 'react'
import './GuidesModal.css'
import DropBox from '../dropbox/DropBox';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

export default function GuideModal() {
    const [isEditActive, setIsEditActive] = useState(true)

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
    
    const [guideData, setGuideData] = useState({
      guideTitle: '',
      guideDescription: '',
    });

    const handleSubmit = (e) => {
      e.prguideDefault();
      console.log('Form submitted with data:', guideData);
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
                            placeholder='Create new guide' 
                            style={{height: '80px', margin: '10px'}}
                            // value={guideTitle}
                            // onChange={(e) => setGuideTitle(e.target.value)}
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
                                    <TextField
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
                                    />
                                  </div>
                                </Box>
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
