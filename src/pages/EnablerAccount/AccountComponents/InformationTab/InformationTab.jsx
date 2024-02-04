import React, { useState } from 'react'
import styles from './informationTab.module.css'

import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Save } from '@mui/icons-material'

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

  const handleSave = async () => {
    alert('Save Clicked');
  }

  return (
    <>
        
            {props.isEditing ?(
              <div className={styles["editingContainer"]}>
                <h1>Edit Details</h1>
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
                      rows={20}
                    />
                      {/* <TextField
                      id="enablerAddress"
                      label="Address"
                      defaultValue={props.address}
                      onChange={handleAddressChange}
                      sx={{margin: '10px'}}
                      /> */}
                        {/* <TextField
                        id="enablerEmail"
                        label="Email"
                        defaultValue={props.email}
                        onChange={handleEmailChange}
                        sx={{margin: '10px'}}
                        /> */}
                          <TextField
                          id="enablerPhone"
                          label="Phone"
                          defaultValue={props.phone}
                          onChange={handlePhoneChange}
                          sx={{margin: '10px'}}
                          />
                          {/* <TextField
                          id="enablerFacebook"
                          label="Facebook"
                          defaultValue={props.fb}
                          onChange={handleFBChange}
                          sx={{margin: '10px'}}
                          /> */}
                          <Button onClick={handleSave} variant='contained' size='large' startIcon={<Save />} sx={{bgcolor: "#fd7c06", p: 2, borderRadius: 4}}>
                            Save
                          </Button>
                  </Box>
              </div>
               ) : (
                <div className={styles["AboutTabContainer"]}> {/* {styles["enablerContact"]} */}
                  <h1>About</h1>
                  <hr />
                  <div className={styles["enablerContent"]}>
                      <p className={styles["enablerDescription"]}>{props.description}</p>
                      <p className={styles["enablerLocation"]}><FmdGoodRoundedIcon />⠀{props.address}</p>
                      <div className={styles["enablerContact"]} >
                          <p><EmailRoundedIcon />⠀{props.email}</p>
                          <p><CallRoundedIcon />⠀{props.phone}</p>
                          <p><FacebookRoundedIcon/>⠀@{props.fb}</p>
                      </div>
                  </div>
               </div>
               )} 
        
    </>
  )
}

export default InformationTab