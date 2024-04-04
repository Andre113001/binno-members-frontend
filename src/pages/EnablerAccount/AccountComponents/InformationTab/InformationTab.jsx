import React, { Fragment, useState } from 'react'
import styles from './informationTab.module.css'
import useHttp from '../../../../hooks/http-hook';

import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { Add } from '@mui/icons-material';

import { MenuItem, Select } from '@mui/material'
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
  const profileData = props.profileData;
  const [bio, setBio] = useState(props.description);
  const [contactNum, setContactNum] = useState(props.phone);
  const [error, setError] = useState('');
  const {sendRequest, isLoading} = useHttp();

  const handleDescriptionChange = (event) => {
    setBio(event.target.value);
    props.setBio(event.target.value);
    setError('');
  };

  const handlePhoneChange = (event) => {
    setContactNum(event.target.value);
    props.setContactNum(event.target.value);
    setError('');
  };

  const handleChangeLink = (id, value) => {
    const updatedLinks = companyLinks.map((link) => {
        if (link.id === id) {
            return { ...link, value };
        }
        return link;
    });
    setCompanyLinks(updatedLinks);
};


  const handleSave = async () => {
    props.handleSave();
  }

  console.log(profileData);

  return (
    <>
        
            {props.isEditing ?(
              <div className={styles["editingContainer"]}>
                  <section className={styles['form-container']}>
                    <h1 className={styles['editing_header']}>Your Profile</h1>
                      <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                          <label htmlFor="company_name">Company Name</label>
                          <TextField 
                            id='company_name'
                            size='small'
                            placeholder="Insert your organization's name here..."
                            fullWidth
                            defaultValue={profileData.setting_institution}
                          />
                        </div>

                        <div className={styles['form-col']}>
                          <label htmlFor="email">Email Address</label>
                          <TextField 
                            id='email'
                            size='small'
                            placeholder='Insert email address here...'
                            fullWidth
                            defaultValue={profileData.email_address}
                          />
                        </div>
                      </div>

                      <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                          <label htmlFor="contact">Contact Number</label>
                          <TextField 
                            id='contact'
                            size='small'
                            placeholder='Insert contact number here...'
                            fullWidth
                            defaultValue={profileData.contact_number}
                          />
                        </div>
                        <div className={styles['form-col']} > 
                          {profileData.member_type === 2 && (
                            <Fragment>
                              <label htmlFor="enabler_class">Classification</label>
                              <Select
                                  id='enabler_class'
                                  // value={classificationValue}
                                  // onChange={handleClassificationChange}
                                  fullWidth
                                  size='small'
                                >
                                <MenuItem value={"SUC"}>State University and Colleges</MenuItem>
                                <MenuItem value={"LGU"}>Local Government Unit</MenuItem>
                                <MenuItem value={"TBI"}>Technology Business Incubator</MenuItem>
                              </Select>
                            </Fragment>
                          )}
                        </div>
                      </div>

                      <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                          <label htmlFor="address">Address</label>
                          <TextField 
                            id='address'
                            size='small'
                            placeholder='Insert address here...'
                            fullWidth
                            defaultValue={profileData.setting_address}
                          />
                        </div>
                      </div>


                      <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                          <label htmlFor="tagline">Tagline</label>
                          <TextField 
                            id='tagline'
                            size='small'
                            placeholder='Masarap kahit walang sauce.'
                            fullWidth
                          />
                        </div>
                      </div>

                      <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                          <label htmlFor="links">Company Links</label>
                          {profileData.companyLinks && profileData.companyLinks.map((element, index) => (
                              <TextField 
                              id='links'
                              size='small'
                              fullWidth
                              placeholder='Insert link here...'
                              defaultValue={element.url}
                            />
                          ))}
                           <Button
                              variant='outlined'
                              startIcon={<Add />}
                              sx={{
                                  color: 'text.primary',
                                  borderColor: 'text.disabled',
                                  '&:hover': {
                                      borderColor: 'text.primary',
                                      color: 'black'
                                  }
                              }}>
                              Add
                          </Button>
                        </div>
                      </div>

                      <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                          <label htmlFor="description">Description</label>
                          <TextField 
                            id='description'
                            size='small'
                            defaultValue={profileData.setting_bio}
                            placeholder='Tell us about your organization...'
                            fullWidth
                            multiline
                            rows={12}
                          />
                        </div>
                      </div>
                  </section>
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
