import React, { useState, useEffect } from 'react';

import Header from '../../components/header/Header';
import Back from '../../components/Back/Back';
import useAccessToken from '../../hooks/useAccessToken';

import { Link, useParams } from 'react-router-dom';
import GuideElements from './GuideElements';
import {
    AddPhotoAlternateOutlined
} from '@mui/icons-material'

import {
    Chip,
    styled,
    Button
} from '@mui/material'

import './Guides.css';

const GuidePage = () => {
    const { program_id } = useParams();
    const [pageContents, setPageContents] = useState();
    const [currentPage, setCurrentPage] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(
        'https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1000&h=563&crop=1&resize=1000%2C563'
      );
    const accessToken = useAccessToken();
    useEffect(() =>  {
        try {
            const loadPageData = async () => {
                const response = await fetch(`/api/program/${program_id}`,{
                    headers: {
                      Authorization: `Bearer ${accessToken}`
                    }
                });
                const data = await response.json();
                
                console.log(data);
                setPageContents(data);
                setCurrentPage(data[0]?.program_pages_id);
            };

            loadPageData();
        } catch (error) {   
            console.log('Error Fetching Data: ', error.message);
        }
    }, [program_id]);

    // Callback function to update save status
    const updateSaveStatus = (status) => {
        setIsSaved(status);
    };

    const showAlert = () => {
        alert('Please save your changes before navigating to another page.');
    };

    const handleCoverPhoto = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setBackgroundImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

      
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
    <div>
        {pageContents ? (
            <div className='App'> 
            <div className='layoutContainer'>
                <div className="Headline">
                    <Header />
                </div>
                <div className="page-view">
                    <div className="heading">
                        <div className="back">
                            <Back link={'/guides'}/>
                        </div>
                    </div>
                    <main className='page-body'>
                        <div className="page-selector">
                            <button className='add-page-btn'>
                                + Add Page
                            </button>
                            <ul>
                                {pageContents?.map((content, index) => (
                                    <li key={content.program_pages_id}  className='pages'>
                                        <Link style={{textDecoration: "none", color: 'black' }} onClick={() => (isSaved ? setCurrentPage(content.program_pages_id) : showAlert())}>{index + 1}. {content.program_pages_title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="page-edit">
                            <div className="page-title-sm">
                                <p>{pageContents[0]?.program_heading}</p>
                            </div>
                            <div className="cover-photo" style={{ backgroundImage: `url(${backgroundImage})` }}>
                                <div className="upload-cover-btn">
                                <Button component="label" variant="filled" style={{ backgroundColor: "#424864", color: 'white', fontSize: 12, borderRadius: 30, display: 'flex', alignItems: 'center' }} startIcon={<AddPhotoAlternateOutlined />}>
                                    Change Photo
                                    <VisuallyHiddenInput onChange={handleCoverPhoto} type="file" />
                                </Button>
                                </div>
                            </div>
                            <GuideElements page={currentPage} updateSaveStatus={updateSaveStatus}/>
                        </div>
                    </main>
                </div>
            </div>
        </div>
        ) : (
            <div>
                <h1>Loading...</h1>
            </div>
        )}
        {console.log(isSaved)}
    </div>
    )
}

export default GuidePage
