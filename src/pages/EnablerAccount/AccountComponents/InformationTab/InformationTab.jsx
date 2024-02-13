import React, { useState } from 'react'
import styles from './informationTab.module.css'
import useHttp from '../../../../hooks/http-hook';

import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MuiTelInput } from 'mui-tel-input'
import { Save } from '@mui/icons-material';

function InformationTab(props) {
  const [initialValues, setInitialValues] = useState({
    description: props.description,
    phone: props.phone
  });
  const [bio, setBio] = useState(props.description);
  const [contactNum, setContactNum] = useState(props.phone);
  const [error, setError] = useState('');
  const {sendRequest, isLoading} = useHttp();

  const handleDescriptionChange = (event) => {
    setBio(event.target.value);
    setError('');
  };

  const handlePhoneChange = (event) => {
    setContactNum(event.target.value);
    setError('');
  };

  // console.log(props.member_id);

  const handleSave = async () => {
    if (bio === initialValues.description && contactNum === initialValues.phone) {
      setError('No changes made');
      console.error('No changes made');
    } else {
      const res = await sendRequest({
        url: `${import.meta.env.VITE_BACKEND_DOMAIN}/members/update-profile`,
        method: 'POST',
        body: JSON.stringify({
          member_id: props.member_id,
          description: bio,
          contactNumber: contactNum
        }),
        headers: {
          'Content-Type': 'application/json', // Set Content-Type for file uploads
        },
      })
      
      console.log(res);

      if (res.message === 'Profile settings and contact updated successfully') {
        window.location.reload();
      }
    }
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
                          {/* <p><FacebookRoundedIcon/>⠀@{props.fb}</p> */}
                      </div>
                  </div>
               </div>
               )} 
        
    </>
  )
}

export default InformationTab;
