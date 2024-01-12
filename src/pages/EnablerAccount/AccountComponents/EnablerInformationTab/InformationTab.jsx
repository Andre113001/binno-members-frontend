import React, { useState } from 'react'
import styles from './informationTab.module.css'

import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function InformationTab(props) {
  const [name, setName] = useState('');

  const handleDescriptionChange = (event) => {
    props.onDescriptionChange(event.target.value);
  };

  const handleAddressChange = (event) => {
    props.onAddressChange(event.target.value);
  };

  const handleEmailChange = (event) => {
    props.onEmailChange(event.target.value);
  };

  const handlePhoneChange = (event) => {
    props.onPhoneChange(event.target.value);
  };

  const handleFBChange = (event) => {
    props.onFBChange(event.target.value);
  };

  return (
    <>
        
            {props.isEditing ?(
              <div className={styles["editingContainer"]}>
                <h1>Edit About Page</h1>
                  <hr />
                  <Box
                    component="form"
                    sx={{ m: 1, width: '60%' , display: 'flex', flexDirection: 'column'}}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="enablerDescription"
                      label="Description"
                      defaultValue={props.description}
                      onChange={handleDescriptionChange}
                      sx={{margin: '10px'}}
                      multiline
                      maxRows={5}
                    />
                      <TextField
                      id="enablerAddress"
                      label="Address"
                      defaultValue={props.address}
                      onChange={handleAddressChange}
                      sx={{margin: '10px'}}
                      />
                        <TextField
                        id="enablerEmail"
                        label="Email"
                        defaultValue={props.email}
                        onChange={handleEmailChange}
                        sx={{margin: '10px'}}
                        />
                          <TextField
                          id="enablerPhone"
                          label="Phone"
                          defaultValue={props.phone}
                          onChange={handlePhoneChange}
                          sx={{margin: '10px'}}
                          />
                          <TextField
                          id="enablerFacebook"
                          label="Facebook"
                          defaultValue={props.fb}
                          onChange={handleFBChange}
                          sx={{margin: '10px'}}
                          />
                  </Box>
              </div>
               ) : (
                <div className={styles["AboutTabContainer"]}> {/* {styles["enablerContact"]} */}
                  <h1>About</h1>
                  <hr />
                  <div className={styles["enablerContent"]}>
                      <p className={styles["enablerDescription"]}>{props.description}</p>
                      <p className={styles["enablerLocation"]}><FmdGoodRoundedIcon /> {props.address}</p>
                      <div className={styles["enablerContact"]} >
                          <p><EmailRoundedIcon />{props.email}</p>
                          <p><CallRoundedIcon />{props.phone}</p>
                          <p><FacebookRoundedIcon/>@{props.fb}</p>
                      </div>
                  </div>
               </div>
               )} 
        
    </>
  )
}

export default InformationTab