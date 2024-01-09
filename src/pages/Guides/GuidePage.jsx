import React, { useState, useEffect } from 'react';

import Header from '../../components/header/Header';
import Back from '../../components/Back/Back';

import { Link, useParams } from 'react-router-dom';
import GuideElements from './GuideElements';

import './Guides.css';

const GuidePage = () => {
    const { program_id } = useParams();
    const [pageContents, setPageContents] = useState();
    const [currentPage, setCurrentPage] = useState('');
    
    useEffect(() =>  {
        try {
            const loadPageData = async () => {
                const response = await fetch(`/api/program/${program_id}`)
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
                        <div className="page-title-sm">
                            <p>{pageContents[0]?.program_heading}</p>
                        </div>
                        <div className="page-save-btn">
                            <button >
                                Save
                            </button>
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
                                        <Link onClick={() => setCurrentPage(content.program_pages_id)}>{index + 1}. {content.program_pages_title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="page-edit">

                            <div className="cover-photo">

                            </div>
                            <GuideElements page={currentPage}/>
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
    </div>
    )
    
}

export default GuidePage
