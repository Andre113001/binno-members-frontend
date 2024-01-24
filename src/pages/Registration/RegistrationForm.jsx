import React, { useEffect } from 'react'
import './RegistrationForm.css'
import  { useState } from 'react';
import StyledToggleButton from '../../components/ToggleButton/ToggleButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Copyright from '../../components/Copyright/Copyright';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/http-hook';


function RegistrationForm() {
    const navigate = useNavigate();
    const { sendRequest, isLoading } = useHttp();

    useEffect(() => {
      const destroyToken = () => {
        localStorage.clear();
        setFormData('');
      }

      destroyToken();
    }, [])

    const [formData, setFormData] = useState({
      institution: '',
      email: '',
      address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          type: "Company",
          classification: null,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await sendRequest({url: `${import.meta.env.VITE_BACKEND_DOMAIN}/register/`, 
                method: 'POST',
                body: JSON.stringify(formData)
            })

            if (res.appId) {
              console.log(res.appId);
              console.log(formData);
              localStorage.setItem("app_id", res.appId);
              localStorage.setItem("form_info", JSON.stringify(formData));
              navigate('/register/upload');
            } else {
              console.log(res);
            }
        } catch (error) {
          console.error('Error:', error.message);
      
          // Log more details from the error response if available
          if (error.response) {
            console.error('Error:', error.message);
          }
        }
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
                            value={formData.institution} 
                            required
                            name='institution' 
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
                        <button className='registerButton' type="submit">Next</button>
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