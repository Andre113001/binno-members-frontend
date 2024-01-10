import React, { useState, useEffect } from 'react'
import './modal.css'
import DropBox from '../dropbox/DropBox.jsx'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function Modal() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(()=> { 
    const interValId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
  
    return () => clearInterval(interValId);

  }, []);
  
  const formatDateToText = () => {
    const dateYear = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return currentDate.toLocaleDateString(undefined, dateYear);
  }; 


  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const category = event.target.elements.category.value;
    const description = event.target.elements.description.value;
    console.log('Form submitted:', { title, description, category});
    toggleModal();

    if (inputValue.length <= characterLimit) {
      setText(inputValue);
    }
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
  
    return (
    <>
    <button onClick={toggleModal} className="createBlog">
            <AddIcon/>Create a new Event
        </button>

        {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <div className="titleDateContainer">
                        <input 
                          type="text"
                          className='titleTextBox'
                          placeholder='Create new entry' 
                        />
                        <p>{formatDateToText()}</p>
                    </div>

                    <button className="close-modal" onClick={toggleModal}>
                    <CloseRoundedIcon />
                    </button>
                      <div className="categoryTagContainer">
                        <button className='categoryButton'>Add to Category
                        </button>
                    </div>
                    <div className="texboxContainer">
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
                            style={{ maxHeight: '250px' ,height: '250px',maxWidth:'1300px' ,width: '100%', border: 'white', 
                              margin: "20px", backgroundColor:"rgb(241,241,241)", outline:'none'}}
                            minRows={6}
                            maxRows={7}
                            inputProps={{ maxLength: 150 }}
                          />
                        </div>
                    </Box>
                    </div>
                    <div className="dropboxContainer">
                      <DropBox />
                    </div>
                    <button type="submit" className="uploadButton">  
                      Upload
                    </button>
                </div>
            </div>
        )}
    </>
  )
}
