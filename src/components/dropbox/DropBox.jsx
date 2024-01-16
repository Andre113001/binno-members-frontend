import { useRef, useState } from "react"
import React from 'react'
import styles from './dropBox.module.css'
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';


function DropBox(props) {
    const {onFileUpload,fileRef,uploadError,uploadedFile} = props
    
  return (
    <>
        <div className={styles['imageContainer']} onClick={() => fileRef.current.click()}>
                {!uploadedFile && <div className={styles['TextImage']}>
                    <ImageRoundedIcon />
                    <p>Click to upload a photo</p>
                </div>
                }
                
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
                onChange={onFileUpload}
                type="file"
                style={{ display: 'none' }}
                accept=".png, .jpg, .jpeg"
            />
    </>
  )
}

export default DropBox