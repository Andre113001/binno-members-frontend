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

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        institution: '',
        email: '',
        address: ''
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
          type: "Enabler",
          classification: option.short, 
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
        setError("")
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
        try {
          // Check if all required fields are filled in
          if (!formData.institution || !formData.email || !formData.address) {
            throw new Error("Please fill in all required fields.");
          }
      
          const res = await sendRequest({
            url: `${import.meta.env.VITE_BACKEND_DOMAIN}/register/`,
            method: 'POST',
            body: JSON.stringify(formData)
          });
      
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
      
          // Set error message for display
          setError(error.message);
      
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
                <div className="switchUser">
                    <StyledToggleButton  currentPage={'Enabler'}   
                    />
                </div>

                <p>Please fill up the required fields. </p>

                    <div className="enablerTypeButton" ref={dropdownRef}>
                        <button className="dropdown-button" onClick={toggleMenu} onSubmit={handleSubmit}>
                            {selectedOption.long || 'Select what type of Startup Enbabler'}
                        </button> 
                        {isMenuOpen && (
                            <div className="EnablerTypes">
                                <p onClick={() => {handleOptionClick({short: 'TBI', long: 'Technology Business Incubator'})}}>Technology Business Incubation</p>
                                <p onClick={() => handleOptionClick({short: 'LGU', long: 'Local Government Unit'})}>Local Government Unit</p>
                                <p onClick={() => handleOptionClick({short: 'SUC', long: 'State Universities and Colleges'})}>State Universities and Colleges</p>
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
                            <TextField id="institution" label="Name of Institution" 
                                value={formData.institution} 
                                required 
                                name='institution'
                                error={Boolean(error)}
                                onChange={handleChange}
                                style={{width:'100%', borderRadius: '10px', boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 10%)"}}/>
                        </div>
                        <div >
                            <TextField id="email" label="E-mail" 
                                value={formData.email}
                                name='email' 
                                required 
                                error={Boolean(error)}
                                onChange={handleChange}
                                style={{width:'100%', borderRadius: '10px', boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 10%)"}}/>
                            </div>
                            <div >
                                <TextField id="address" label="Address" 
                                    value={formData.address} 
                                    name='address'
                                    required 
                                    error={Boolean(error)}
                                    onChange={handleChange}
                                    style={{width:'100%', borderRadius: '10px', boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 10%)"}}/>
                            </div>
                            {error && <p style={{ color: "red" }}>{error}</p>}
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