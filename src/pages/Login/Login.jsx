import React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import logo from '../../icon.svg'

import { json, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthContext';
import useHttp from '../../hooks/http-hook';

// Components
import Copyright from '../../components/Copyright/Copyright';
import { MuiOtpInput } from 'mui-one-time-password-input'

const Login = () => {
    const navigate = useNavigate();
    const { login, setMemberId } = useAuth();
    const [ currentSection, setCurrentSection ]  = useState(1);
    const [ otp, setOtp ] = useState('');
    const [ accesskey, setAccessKey ] = useState();
    const { sendRequest, isLoading } = useHttp();
    

    const handleOtpChange = (newValue) => {
        setOtp(newValue)
    };

    const handleOtpComplete = async (value) => {
        // console.log("New OTP: ", value, "AccessKey: ", accesskey);
        const requestDataOtp = {
            accesskey: accesskey,
            otp: value
        }
        const res = await sendRequest({url: `${import.meta.env.VITE_BACKEND_DOMAIN}/login/verify`, 
            method: 'POST',
            body: JSON.stringify(requestDataOtp)
        })

        console.log(res);

        if (res.auth === 1) {
            localStorage.setItem('access', res.token);
            navigate('/getting-started');
        } else if (res.auth === 0) {
            localStorage.setItem('access', res.token);
            navigate('/account');
        } else {
            alert("Incorrect PIN")
        }
    };

    const matchIsString = (text) => {
        return typeof text === 'string';
    };

    const matchIsNumeric = (text) => {
        const isNumber = typeof text === 'number'
        const isString = matchIsString(text)
        return (isNumber || (isString && text !== '')) && !isNaN(Number(text))
    }
      
    const validateChar = (value, index) => {
        return matchIsNumeric(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const accessKey = data.get('access-key');
        const password = data.get('password');
        const requestData = {
            accessKey: accessKey,
            password: password
        }


        try {
            const res = await sendRequest({url: `${import.meta.env.VITE_BACKEND_DOMAIN}/login`, 
                method: 'POST',
                body: JSON.stringify(requestData)
            })
            console.log(res);
            // const response = await axios.post('/api/login', requestData);
            // const data = response.data;  // Axios automatically parses the JSON response
            // console.log(data.auth);
    
            if (res.twoAuth) {
                setCurrentSection(2);
                setAccessKey(requestData.accessKey);
                // localStorage.setItem('access', data.token);
                // login(); // Set authenticated to true
                // navigate('/account');
            } else {
                console.log(false);
            }
        } catch (err) {
            console.error(err);
        }
        
    };

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <img src={logo} alt="" width={350}/>
            {currentSection === 1 && (
                <>
                    <Typography fontWeight={'bold'} className='sm:text-sm' component="h1" variant="h5">
                        Members Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="access-key"
                        label="Access Key"
                        name="access-key"
                        autoComplete="off"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        sx={{ mt: 1, mb: 2, }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2, p: 1.5}}
                        style={{
                            backgroundColor: "#ff7a00",
                        }}
                        disabled={isLoading}
                    >
                        Sign-in
                    </Button>
                    </Box>
                    <Link sx={{mt: 3}} href="/forgot">Forgot Password?</Link>
                    
                    <div style={{marginTop: "20px"}}>
                        <Link sx={{mt: 3}} href="/register">Sign-up for membership here</Link>
                    </div>
                </>
            )}
            {currentSection === 2 && (
                <>
                    <Box sx={{ mt: 1 }}> 
                        <Typography textAlign={'center'} fontWeight={'bold'} variant="h5">
                            Two-factor Athentication
                        </Typography>
                        <Typography textAlign={'center'}>
                            To verify your login, we've sent a one-time-pin to your email address, kindly input your OTP below.
                        </Typography>
                        <MuiOtpInput TextFieldsProps={{ placeholder: '#' }} style={{marginTop: 20}} onComplete={handleOtpComplete} length={6} value={otp} onChange={handleOtpChange} validateChar={validateChar}/>
                        {/* <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 2, p: 1.5}}
                            style={{
                                backgroundColor: "#ff7a00",
                            }}
                            onClick={handleOtp}
                         >
                        Submit
                        </Button> */}
                    </Box>
                </>
            )}
        </Box>
        <Copyright />
        </Container>
    );    
}

export default Login
