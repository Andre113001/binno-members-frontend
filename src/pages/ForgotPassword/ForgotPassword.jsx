import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Container,
    CssBaseline,
    Typography,
    Link,
} from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import axios from 'axios';
import logo from '../../icon.svg';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [accessKey, setAccessKey] = useState('');
    const [error, setError] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setButtonDisabled(true);

        axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/password/verifyChangePassword`, {
            accesskey: accessKey
        })
        .then(response => {
            // console.log('Response from localhost:3200', response.data);
            if (response.data.message === "Email Sent") {
                // Redirect to the verifyPassword page
                navigate('/change-password-sent');
            } else {
                setError(response.data.message);
                setButtonDisabled(false);
            }
        })
        .catch(error => {
            console.error('Error making request', error.message);
            setError('An unexpected error occurred.');
            setButtonDisabled(false);
        });
    };

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img src={logo} alt="" width={350} />
                <Typography component="h1" variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
                    Forgot Password
                </Typography>
                <Typography component="h1" variant="subtitle1" align='center' sx={{ mb: 3 }}>
                    Enter your Access Key and we'll send you an email to reset your password.
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="access-key"
                        label="Access Key"
                        name="access-key"
                        autoComplete="off"
                        autoFocus
                        value={accessKey}
                        onChange={(e) => setAccessKey(e.target.value)}
                        error={Boolean(error)}
                        helperText={error}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 5, p: 1.5 }}
                        style={{
                            backgroundColor: "#599ef3",
                        }}
                        onClick={handleSubmit}
                        disabled={buttonDisabled}
                    >
                        Submit
                    </Button>
                </Box>
                <Link color={'inherit'} href='/' style={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>
                    <ArrowBackIos sx={{ fontSize: 15 }} />
                    <span>Back to login</span>
                </Link>
            </Box>
        </Container>
    );
}

export default ForgotPassword;
