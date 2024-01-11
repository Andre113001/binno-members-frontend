import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

const UploadDocuments = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFilesSubmit = async () => {
        try {
          const formData = new FormData();
    
          // Convert FileList to array
          Array.from(selectedFiles).forEach((file) => {
            formData.append('files', file);
          });
          
          console.log(formData);
          // You might want to replace the URL with your actual endpoint
        //   await axios.post('/api/application/documentsUpload', formData);
    
          // Handle success or show a success message
          console.log('Files uploaded successfully');
        } catch (error) {
          // Handle error or show an error message
          console.error('Error uploading files:', error.message);
        }
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles(files);
    };


    return (
        <div>
        <div className="upload-container">
            <Typography variant="h5">Supporting Documents</Typography>
            <Typography>Please upload the following:</Typography>
            <List>
            <ListItem>
                <ListItemText primary="Business Permit" />
            </ListItem>
            <ListItem>
                <ListItemText primary="BIR Receipt" />
            </ListItem>
            <ListItem>
                <ListItemText primary="Valid ID" />
            </ListItem>
            </List>
            <Typography>Upload your documents</Typography>
            <Input
                type="file"
                inputProps={{ accept: '.jpeg, .png, .jpg, .pdf' }}
                onChange={handleFileChange}
                multiple
            />
            <Button variant="contained" color="primary" onClick={handleFilesSubmit}>
                Submit
            </Button>
        </div>
        </div>
    );
};

export default UploadDocuments;
