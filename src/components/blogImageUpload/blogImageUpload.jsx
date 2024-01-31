import { useRef, useState, useEffect } from "react";
import React from 'react';
import styles from './blogImageUpload.module.css';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';

function BlogImageUpload(props) {
    const { uploadedFile, setUploadedFile, initialFile, onChange } = props;
    const [uploadError, setUploadError] = useState(null);
    const fileRef = useRef();

    useEffect(() => {
        // Set the initial file when the component mounts
        if (initialFile) {
            setUploadedFile(initialFile);
        }
    }, [initialFile, setUploadedFile]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];

        const isImage = file.type.split('/')[0] === 'image' ?? false;

        if (!isImage) {
            setUploadError('The uploaded file is not a valid image.');
            return;
        }

        if (!checkFileSize(file)) {
            setUploadError(
                'The image size exceeds the maximum allowed size of 5 MB.'
            );
            return;
        }

        setUploadedFile(file);
        setUploadError(null);

        // Notify parent component about the change
        if (onChange) {
            onChange(file);
        }

        return [];
    };

    const checkFileSize = (file) => {
        const fileSizeInMB = file.size / (1024 * 1024);

        if (fileSizeInMB > 5) {
            setUploadError(
                'The file size is too large. Please upload a file that is smaller than 5MB.'
            );
            return false;
        }

        return true;
    };

    return (
        <>
            <div className={styles['imageContainer']} onClick={() => fileRef.current.click()}>
                {!uploadedFile && <div className={styles['TextImage']}>
                    <ImageRoundedIcon />
                    <p>Click to upload a photo</p>
                </div>}
                
                {uploadedFile && (
                    <div className={styles['uploadedPreview']}>
                        <img
                            src={URL.createObjectURL(uploadedFile)}
                            alt="uploaded_image"
                        />
                        <span>Click to replace image</span>
                    </div>
                )}
            </div>
            
            <input
                ref={fileRef}
                onChange={handleFileUpload}
                type="file"
                style={{ display: 'none' }}
                accept=".png, .jpg, .jpeg"
            />
            {uploadError && <p className={styles['errorText']}>{uploadError}</p>}
        </>
    );
}

export default BlogImageUpload;
