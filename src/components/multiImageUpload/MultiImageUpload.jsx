import { useRef, useState } from "react"
import React from 'react'
import styles from './MultiImageUpload.module.css'
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function DropBox() {
    const [uploadedFile, setUploadedFile] = useState([])
    const [uploadError, setUploadError] = useState(null)
    const fileRef = useRef()
    
    const handleFileUpload = async (e) => {
        const files = e.target.files;
    
        const newFiles = Array.from(files).map(file => {
          const isImage = file.type.split('/')[0] === 'image';
    
          if (!isImage) {
            setUploadError('One or more uploaded files are not valid images.');
            return null;
          }
    
          if (!checkFileSize(file)) {
            setUploadError('One or more images exceed the maximum allowed size of 5 MB.');
            return null;
          }
    
          return file;
        });
    
        const filteredFiles = newFiles.filter(file => file !== null);
    
        setUploadedFile([...uploadedFile, ...filteredFiles]);
        setUploadError(null);
    
        // console.log('Uploaded Files:', filteredFiles);
        // console.log(uploadedFile)
      };

      const handleDeleteImage = (index) => {
        let newUpdatedFiles = [...uploadedFile];
        newUpdatedFiles.splice(index, 1);
        setUploadedFile(newUpdatedFiles);
        console.log(uploadedFile)
      };
    
      const checkFileSize = (file) => {
        const fileSizeInMB = file.size / (1024 * 1024);
    
        if (fileSizeInMB > 5) {
          setUploadError(
            'One or more files have a size larger than the allowed maximum of 5MB.'
          );
          return false;
        }
    
        return true;
      };
    
  return (
    <>
        <div className={styles['imageContainer']} >
            <div className={styles['Clicker']} onClick={() => fileRef.current.click()}>
                </div>
                {uploadedFile.length === 0 && ( 
                    <div className={styles['TextImage']}>
                        <ImageRoundedIcon />
                        <p>Click to upload a photo</p>
                    </div>

                )}
            
                {uploadedFile?.length > 0 && (
                    <div className={styles['uploadedPreview']}>
                        {uploadedFile.map((file, index) => (
                        <div key={index} className={styles['uploadedImageContainer']}>
                            <img
                            src={URL.createObjectURL(file)}
                            alt={`uploaded_image_${index}`}
                            />
                            <button onClick={() => handleDeleteImage(index)} className={styles['deleteButton']}>
                                <CloseRoundedIcon />
                            </button>
                            <span className={styles['imageIndex']}>
                                {index +  1}
                            </span>
                        </div>
                        ))}
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
    </>
  )
}

export default DropBox