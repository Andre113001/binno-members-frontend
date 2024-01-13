import React, { useState } from 'react';
import { Typography, Button, TextField, Divider, VisuallyHiddenInput} from '@mui/material';
import { ArrowBack } from '@mui/icons-material/'
import { FileUploader } from 'react-drag-drop-files';
import Copyright from '../../components/Copyright/Copyright';

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
  

  const handleNextClick = () => {
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
      // Validate description field
      if (description.trim() !== '') {
        // Continue with your submission logic
        console.log(password);
        console.log(logoFile);
        console.log(coverPhotoFile);
        console.log(description);
        console.log('Submission complete!');
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
            Hi BiNNO, before accessing your account, let's first set up some things
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
                sx={{ marginTop: 2 }}
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
                sx={{ marginTop: 2 }}
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
                  <img className='preview-logo' src={logoFile ? logoFile : '../../../public/img/profile-default.png'} alt="Logo Preview" />
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
                    src={coverPhotoFile ? coverPhotoFile : '../../../public/img/cover-default.png'} 
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
                Description
              </Typography>
              <TextField fullWidth multiline rows={8} value={description} onChange={handleDescriptionChange} />
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
          onClick={currentSection === 3 ? handleNextClick : () => setCurrentSection(currentSection + 1)}
        >
          {currentSection === 3 ? 'Submit' : 'Next'}
        </Button>
      </div>
      <Copyright />
    </div>
  );
};

export default FirstTimeLogin;
