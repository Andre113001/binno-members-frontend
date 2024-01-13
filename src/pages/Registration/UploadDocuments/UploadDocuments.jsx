import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { FileUploader } from "react-drag-drop-files";
import './UploadDocuments.css';
import { Link } from 'react-router-dom';

import {
    AssignmentOutlined,
    Clear,
    ArrowBackIos
} from '@mui/icons-material';

import UploadSuccess from './UploadSuccess';

const UploadDocuments = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [sizeError, setSizeError] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileTypes = ["JPG", "PNG", "PDF"];

    const handleFilesSubmit = async () => {
        try {
            const formData = new FormData();
    
            // Convert FileList to array
            Array.from(selectedFiles).forEach((file) => {
                formData.append('files', file);
            });
    
            console.log(formData);
            // You might want to replace the URL with your actual endpoint
            // await axios.post('/api/application/documentsUpload', formData);
    
            // Handle success or show a success message
            console.log('Files uploaded successfully');
            setUploadSuccess(true)
        } catch (error) {
            // Handle error or show an error message
            console.error('Error uploading files:', error.message);
        }
    };

    const truncateFileName = (fileName) => {
        const maxLength = 20; // Set your desired maximum length
      
        if (fileName.length <= maxLength) {
          return fileName;
        } else {
          const truncatedName = fileName.substring(0, maxLength - 4); // 4 is the length of '...' plus the extension
          const fileExtension = fileName.split('.').pop();
          return `${truncatedName}...${fileExtension}`;
        }
    };
      
    const handleFileChange = (files) => {
        // Ensure files is an array
        const fileList = Array.isArray(files) ? files : [files];
      
        // Check if the total number of files is within the limit
        if (selectedFiles.length + fileList.length > 5) {
          console.log('Maximum file limit reached (5 files)');
          return;
        }
      
        // Check the size of each file
        const maxSize = 5 * 1024 * 1024; // 5MB
        const filesToAdd = [];
      
        for (const file of fileList) {
          if (file.size <= maxSize) {
            filesToAdd.push(file);
          } else {
            console.log(`File ${file.name} exceeds the maximum size (5MB) and won't be added.`);
          }
        }
      
        // Concatenate the new files with the existing ones
        setSelectedFiles((prevFiles) => [...prevFiles, ...filesToAdd]);
      };
    
    

    const handleDeleteFileSelection = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };
    

    console.log(selectedFiles);


    const listItems = [
        { id: 1, name: "BIR Permit" },
        { id: 2, name: "Proof of Business" },
        { id: 3, name: "Valid ID" },
    ];

    return (
        <div>
            <div className="upload-container">
                {uploadSuccess ? (
                    <UploadSuccess />
                ) : (
                    <>
                        <div>
                            <Typography variant="h3" fontWeight={"bold"}>Supporting Documents</Typography>
                            <Typography>For Startup Company, Please upload the following:</Typography>
                        </div>
                        <div>
                            <List>
                                {listItems.map((item) => (
                                    <ListItem key={item.id}>
                                        <ListItemIcon>
                                            <AssignmentOutlined />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                        <Typography>Upload your documents</Typography>
                        <FileUploader 
                            required
                            maxSize={5}
                            minSize={0.02}
                            onSizeError={(file) => setSizeError(`File ${file.name} exceeds the allowed size.`)}
                            onChange={() => setSizeError('')} // Reset the error when a new file is selected
                            handleChange={handleFileChange}
                            label={`Upload your files here${sizeError ? ` - ${sizeError}` : ''}`}
                            name="files"
                            types={fileTypes} 
                        />
                        <div className='fileSelectionContainer'>
                            {selectedFiles.map((file, index)=> (
                                <div key={index} className='fileSelection'>
                                    <div className='fileName'>
                                        <p>{truncateFileName(file.name)}</p>
                                    </div>
                                    <div className='fileDelete'>
                                        <Clear sx={{color: "red"}} onClick={() => handleDeleteFileSelection(index)}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="contained" color="primary" sx={{marginTop: "10px", padding: "15px"}} onClick={handleFilesSubmit}>
                            Submit
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UploadDocuments;
