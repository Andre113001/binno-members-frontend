import React, { useState, useEffect } from 'react';
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
import useHttp from '../../../hooks/http-hook';
import axios from 'axios';
import { Collapse } from '@mui/material';

import useCustomToolTip from '../../../hooks/useCustomToolTip'; // Import the custom tooltip hook

import useCustomSnackbar from '../../../hooks/useCustomSnackbar';

import {
    AssignmentOutlined,
    Clear,
    HelpOutline,
    ExpandMore,
    ExpandLess
} from '@mui/icons-material';

import UploadSuccess from './UploadSuccess';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const UploadDocuments = () => {
    const { SnackbarComponent, showSnackbar } = useCustomSnackbar();
    const { TooltipComponent, showTooltip } = useCustomToolTip(); // Use the custom tooltip hook
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [sizeError, setSizeError] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [ appId, setAppId ] = useState();
    const [ formInfo, setFormInfo ] = useState();
    const fileTypes = ["PDF"];
    const { sendRequest, isLoading } = useHttp();
    const [toggle, setToggle] = useState(false);

    const [error, setError] = useState("");
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        const loadData = () => {
            setAppId(localStorage.getItem('app_id'));
            setFormInfo(JSON.parse(localStorage.getItem('form_info')));
        };

        loadData();
    }, []);

    console.log(appId);

    const handleFilesSubmit = async () => {
        try {
            if (selectedFiles.length === 0) {
                showSnackbar("Please upload at least one document.", 'warning')
                return;
            }
    
            const data = { ...formInfo, id: appId, files: selectedFiles };
            const formData = new FormData();
    
            formData.append('email', formInfo.email);
            formData.append('institution', formInfo.institution);
            formData.append('type', formInfo.type);
            formData.append('classification', formInfo.classification);
            formData.append('address', formInfo.address);
            formData.append('id', appId);
    
    
            // Append each file to the FormData
            selectedFiles.forEach((file, index) => {
                formData.append(`files`, file);
            });
    
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN_ADMIN}/application/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',}
            });
    
            if (res.data.result === true) {
                setUploadSuccess(true);
                localStorage.clear();
            };
    
        } catch (error) {
            // Handle error or show an error message
            console.error('Error uploading files:', error.message);
    
            // Set error message for display
            setSizeError(error.message);
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
          showSnackbar("Maximum file limit reached (5 files)", "warning")
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
    

        // Function to toggle expanded state for a specific item
        const toggleExpanded = (itemId) => {
            setExpandedItems((prevExpandedItems) => ({
                ...prevExpandedItems,
                [itemId]: !prevExpandedItems[itemId]
            }));
        };
    

    const handleDeleteFileSelection = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };



    const listItems = [
        { id: 0, name: "Business Identification Documents", requirements: [
            "SEC Registration (for corporations)",
            "DTI Registration (for sole proprietorships and partnerships)",
            "Mayor's Permit/Business Permit",
            "Bureau of Internal Revenue (BIR) Certificate of Registration",
            "Value Added Tax (VAT) Registration (if applicable)",
            "Taxpayer's Identification Number (TIN)",
            "Social Security System (SSS) Employer ID",
            "PhilHealth Employer Registration",
            "Pag-IBIG Fund Employer Registration",
            "Barangay Clearance",
            "Fire Safety Inspection Certificate",
            "Occupational Permit",
            "Zoning Clearance",
            "Environmental Clearance Certificate (ECC) (if applicable)",
            "License or Accreditation from Regulatory Bodies (if applicable)"
        ]},
        { id: 1, name: "Proof of Business Address", requirements: [
            "Barangay Clearance",
            "Mayor's Permit",
            "Lease Agreement or Land Title",
            "Business Permit from the City or Municipality",
            "Certificate of Registration from the Bureau of Internal Revenue (BIR)",
            "Fire Safety Inspection Certificate",
            "Sanitary Permit",
            "Zoning Clearance"
        ]},
        { id: 2, name: "Valid ID", requirements: [
            "Philippine Passport",
            "Driver's License",
            "Unified Multi-Purpose ID (UMID)",
            "Social Security System (SSS) ID",
            "Government Service Insurance System (GSIS) ID",
            "Professional Regulation Commission (PRC) ID",
            "Postal ID",
            "Voter's ID",
            "PhilHealth ID",
            "Tax Identification Number (TIN) ID",
            "Senior Citizen ID",
            "Overseas Workers Welfare Administration (OWWA) ID",
            "Seaman's Book",
            "Alien Certificate of Registration (ACR) / Immigrant Certificate of Registration (ICR)",
            "National Bureau of Investigation (NBI) Clearance",
            "Police Clearance",
            "Barangay Clearance",
            "Company ID (issued by private companies)"
        ] },
    ];


    return (
        <div>
            <SnackbarComponent />
            <div className="upload-container">
                {uploadSuccess ? (
                    <UploadSuccess />
                ) : (
                    <>
                        <div>
                            <Typography variant="h3" fontWeight={"bold"}>Supporting Documents</Typography>
                            <Typography>Please upload the following:</Typography>
                        </div>
                        <div>
                            <List>
                            {listItems.map((item, index) => (
                                <>
                                    <ListItem key={item.id} button onClick={() => toggleExpanded(item.id)}>
                                        <ListItemIcon>
                                            <AssignmentOutlined />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                        {expandedItems[item.id] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={expandedItems[item.id]} timeout="auto" unmountOnExit>
                                        <List disablePadding>
                                            <Typography variant='h6' fontWeight={'bold'}>You may select atleast one of the following</Typography>
                                            {item.requirements.map((requirement, index) => (
                                                <ListItem key={index} disableGutters>
                                                    <ListItemText primary={requirement} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>

                                </>
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
