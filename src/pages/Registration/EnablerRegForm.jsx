import React from 'react'
import './EnablerRegForm.css'
import  { useState, useEffect, useRef } from 'react';
import StyledToggleButton from '../../components/ToggleButton/ToggleButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Copyright from '../../components/Copyright/Copyright';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/http-hook';

function EnablerRegForm() {
    const { sendRequest, isLoading }  = useHttp()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const dropdownRef = useRef();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        typeofEnaber: '',
        institute: '',
        email: '',
        address: '',
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    // const handleOptionClick = (option) => {
    //     setSelectedOption(option);
    //     setIsMenuOpen(false);
    //   };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setFormData((prevFormData) => ({
          ...prevFormData,
          typeofEnaber: option, 
        }));
        toggleMenu(); 
      };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsMenuOpen(false);
        }
      };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
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
        // navigate('/registration/upload');
      };

  return (
    <>
        <div className="formPage">
            <h1>Become a Member</h1>
                <div className="switchUser">
                    <StyledToggleButton  currentPage={'Enabler'}   
                    />
                </div>

                <p>Please fill up the required fields. </p>

                    <div className="enablerTypeButton" ref={dropdownRef}>
                        <button className="dropdown-button" onClick={toggleMenu} onSubmit={handleSubmit}>
                            {selectedOption || 'Select what type of Startup Enbabler'}
                        </button> 
                        {isMenuOpen && (
                            <div className="EnablerTypes">
                                <p onClick={() => handleOptionClick('Technology Business Incubation')}>Technology Business Incubation</p>
                                <p onClick={() => handleOptionClick('Local Government Unit')}>Local Government Unit</p>
                                <p onClick={() => handleOptionClick('State Universities and Colleges')}>State Universities and Colleges</p>
                            </div>
                        )}
                    </div>    

                <form className='formContent' onSubmit={handleSubmit}>
                    <div className="formFields">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { mb: 2, width: '35ch' },
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
                            <TextField id="email" label="E-mail" 
                                value={formData.email}
                                name='email' 
                                required 
                                onChange={handleChange}
                                style={{width:'100%', borderRadius: '10px', boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 10%)"}}/>
                            </div>
                            <div >
                                <TextField id="address" label="Address" 
                                    value={formData.address} 
                                    name='address'
                                    required 
                                    onChange={handleChange}
                                    style={{width:'100%', borderRadius: '10px', boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 10%)"}}/>
                            </div>
                        </Box>
                    </div>
                        <div>
                            <button className='registerButton' type="submit">Next</button>
                        </div>
                        <div style={{marginTop: "10px"}}>
                            <Link to={'/'}>Already a member? Sign-in here</Link>
                        </div>
                </form>
        </div>
        <Copyright />
    </>
  )

}

export default EnablerRegForm;