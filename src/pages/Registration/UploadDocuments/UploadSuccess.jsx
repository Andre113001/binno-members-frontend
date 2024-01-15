import React from 'react';
import Copyright from '../../../components/Copyright/Copyright';
import './UploadDocuments.css';


import { 
    Typography
} from '@mui/material';

import {
    CheckCircle
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const UploadSuccess = () => {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',  // Set minimum height to cover the entire viewport
        gap: 10,
    }}>
        <CheckCircle sx={{color: "seagreen", fontSize: "12rem", marginBottom: 4}} />
        <Typography variant='h3' fontWeight={"bold"}>Thank you for submitting your application!</Typography>
        <Typography variant='h5'>Kindly wait for 3 to 7 days of processing </Typography>
        <Link to={'/'}>Continue to BiNNO</Link> {/* Replace this with link of wordpress */}
        <Copyright />
    </div>
  )
}

export default UploadSuccess
