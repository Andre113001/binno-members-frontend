import React, { useState } from 'react';
import { Typography, Button, TextField, Divider, VisuallyHiddenInput} from '@mui/material';
import { ArrowBack } from '@mui/icons-material/'
import { FileUploader } from 'react-drag-drop-files';
import Copyright from '../../components/Copyright/Copyright';
import { MuiTelInput } from 'mui-tel-input'
import useHttp from '../../hooks/http-hook';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './FirstTimeLogin.css';

const FirstTimeLogin = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showError, setShowError] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState();
  const { sendRequest, isLoading } = useHttp();
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validatePasswords(event.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);

    if (event.target.value === '') {
      setShowError(false);
    } else if (!showError) {
      validatePasswords(password, event.target.value);
    }
  };

  const validatePasswords = (password, confirmPassword) => {
    setPasswordsMatch(password === confirmPassword);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  
  const handleContactChange = (event) => {
    setContact(event);
  };

  const handleLogoFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPhotoFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackClick = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };
  

const handleNextClick = async () => {
    if (currentSection === 1) {
      // Validate password fields
      setShowError(true);
      if (passwordsMatch) {
        setCurrentSection(2); // Move to the next section
      }
    } else if (currentSection === 2) {
      // Validate logo and cover photo fields
      if (logoFile && coverPhotoFile) {
        setCurrentSection(3); // Move to the next section
      } else {
        alert('Please upload both logo and cover photo.');
      }
    } else if (currentSection === 3) {
      // Validate contact number field
      if (contact === '' || contact.length === 16) {
        setCurrentSection(4);
      } else {
        alert('Please enter your number correctly');
      }
    } else if (currentSection === 4) {
      // Validate description field
      if (description.trim() !== '') {
        const formData = new FormData();

        formData.append('token', localStorage.getItem('access'));
        formData.append('password', password);
        formData.append('contact', contact);
        formData.append('description', description);
        formData.append('profileImg', logoFile);
        formData.append('coverImg', coverPhotoFile);

        try {
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/login/firstTime`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data', // Set Content-Type for file uploads
              },
          });
          
          if (res.data === true) {
            navigate('/account')
          }

        } catch (error) {
            console.error('Error uploading files:', error);
        }
      } else {
        alert('Please enter a description.');
      }
    }
};

  return (
    <div className="first-container">
      <div className="centered-content">
        <div className="first-header">
        {/* {currentSection > 1 && (
          <span style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleBackClick}>
            <ArrowBack />
            <span style={{ marginLeft: '5px' }}>Back</span>
          </span>
        )} */}
          <Typography variant="h3" fontWeight="bold">
            Setting Up
          </Typography>
          <Typography>
            Hi, before accessing your account, let's first set up some things
          </Typography>
          <Divider />
        </div>
        <div className="password-fields">
          {currentSection === 1 && (
            <>
              <div>
              <Typography fontSize={25} fontWeight="bold">
                New Password
              </Typography>
              <TextField
                fullWidth
                id="password"
                type="password"
                label="Password"
                sx={{ marginTop: 1 }}
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <Typography fontSize={25} fontWeight="bold">
                Confirm Password
              </Typography>
              <TextField
                fullWidth
                id="confirmPassword"
                type="password"
                label="Re-type your password"
                variant="outlined"
                sx={{ marginTop: 1 }}
                value={confirmPassword}
                error={!passwordsMatch && showError}
                helperText={!passwordsMatch && showError ? 'Passwords do not match' : ''}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            </>
          )}
        </div>
        {currentSection === 2 && (
          <>
            <div className="photo-container">
              <div className="profile-pic">
                <Typography fontSize={25} fontWeight="bold">
                  Your Logo
                </Typography>
                <center>
                  <img className='preview-logo' src={logoFile ? logoFile : '/img/profile-default.png'} alt="Logo Preview" />
                </center>
                <FileUploader
                  required
                  maxSize={5}
                  minSize={0.002}
                  onSizeError={(file) => alert(`File ${file.name} exceeds the allowed size.`)}
                  label={`Upload your files here`}
                  types={['JPG', 'PNG']}
                  handleChange={(file) => handleLogoFileChange(file)}
                />
              </div>
              <div className="cover-pic" style={{marginTop: 20}}>
                <Typography fontSize={25} fontWeight="bold">
                  Cover Photo
                </Typography>
                <center>
                <img
                    className='preview-cover'
                    src={coverPhotoFile ? coverPhotoFile : '/img/cover-default.png'} 
                    alt="Logo Preview"
                  />
                </center>
                <FileUploader
                  required
                  maxSize={5}
                  minSize={0.002}
                  onSizeError={(file) => alert(`File ${file.name} exceeds the allowed size.`)}
                  label={`Upload your files here`}
                  types={['JPG', 'PNG']}
                  handleChange={(file) => handleCoverPhotoFileChange(file)}
                />
              </div>
            </div>
          </>
        )}
        {currentSection === 3 && (
          <>
            <div className="description">
              <Typography fontSize={25} fontWeight="bold">
                Contact Number
              </Typography>
              <MuiTelInput value={contact} defaultCountry="PH" inputProps={{ maxLength: 12 }} forceCallingCode disableDropdown style={{width: '100%'}} onChange={((event) => handleContactChange(event))} />
            </div>
          </>
        )}
        {currentSection === 4 && (
          <>
            <div className="description">
              <Typography fontSize={25} fontWeight="bold">
                Description
              </Typography>
              <Typography>
                Describe your institution, your goals 
              </Typography>
              <TextField fullWidth multiline rows={8} inputProps={{ maxLength: 250 }} value={description} onChange={handleDescriptionChange} />
            </div>
          </>
        )}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2, p: 1.5 }}
          style={{
            backgroundColor: '#ff7a00',
            borderRadius: 10,
          }}
          onClick={handleNextClick}
        >
          {currentSection === 4 ? 'Submit' : 'Next'}
        </Button>
      </div>
      <Copyright />
    </div>
  );
};

export default FirstTimeLogin;
