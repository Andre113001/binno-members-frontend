import React from 'react'
import './RegistrationForm.css'
import  { useState } from 'react';
import StyledToggleButton from '../../components/ToggleButton/ToggleButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Copyright from '../../components/Copyright/Copyright';

function RegistrationForm() {
    

    const [formData, setFormData] = useState({
      institute: '',
      email: '',
      address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
      };


  return (
    <>
        <div className="formPage">
            <h1>Become a Member</h1>
                <div className="switchUserContainer">
                    <StyledToggleButton currentPage={'Company'}/>
                </div>
                <p>Please fill up the required fields. </p>

                <form className='formContent' onSubmit={handleSubmit}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { mb: 3, width: '35ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <div>
                            <TextField id="institute" label="Name of Institution" 
                            value={formData.institute} 
                            required
                            name='institute' 
                            onChange={handleChange}
                            style={{width:'100%', borderRadius: '10px', boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 10%)"}}/>
                        </div>
                            <div >
                                <TextField id="email" 
                                label="E-mail" 
                                value={formData.email} 
                                required
                                name='email'
                                onChange={handleChange}
                                style={{width:'100%', borderRadius: '10px', boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 10%)"}}/>
                                </div>
                                <div >
                                    <TextField id="address" label="Address" 
                                    value={formData.address} 
                                    required 
                                    name='address'
                                    onChange={handleChange}
                                    style={{width:'100%', borderRadius: '10px', boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 10%)"}}/>
                                </div>
                    </Box>
                    <div>
                        <button className='registerButton' type="submit">Submit</button>
                    </div>
                    <div style={{marginTop: "20px"}}>
                        <Link to={'/'}>Already a member? Sign-in here</Link>
                    </div>
                    
                </form>
        </div>
        <Copyright />
    </>
  )

}

export default RegistrationForm;