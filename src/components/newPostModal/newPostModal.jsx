import React, { useState, useEffect, useCallback, useRef } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import styles from './newPostModal.module.css'
import PostModalTextBox from './PostModalTextBox'
import PostCategory from './Categories.jsx'
import DropBox from '../dropbox/DropBox.jsx'
import { v4 as uuidv4 } from 'uuid';
import useLoadProfile from '../../hooks/useLoadProfile.jsx'

export default function NewPostModal() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [heading, setHeading] = useState() 
    const [content, setContent] = useState() 
    const [uploadedFile, setUploadedFile] = useState()
    const [uploadError, setUploadError] = useState(null)
    const fileRef = useRef()

    const {profileData} = useLoadProfile()

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]

        const isImage = file.type.split('/')[0] === 'image' ?? false

        if (!isImage) {
            setUploadError('The uploaded file is not a valid image.')
            return
        }

        if (!checkFileSize(file)) {
            setUploadError(
                'The image size exceeds the maximum allowed size of 5 MB.'
            )
            return
        }

        setUploadedFile(file)
        setUploadError(null)
        
        console.log('Uploaded File:', file);


        return []
    }

    const checkFileSize = (file) => {
        const fileSizeInMB = file.size / (1024 * 1024)

        if (fileSizeInMB > 5) {
            setUploadError(
                'The file size is too large. Please upload a file that is smaller than 5MB.'
            )
            return false
        }

        return true
    }

    const handleContentChange = (e) => {
      setContent(e.target.value)
    }
    useEffect(() => {
        const interValId = setInterval(() => {
            setCurrentDate(new Date())
        }, 1000)

        return () => clearInterval(interValId)
    }, [])

    const formatDateToText = () => {
        const dateYear = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
        return currentDate.toLocaleDateString(undefined, dateYear)
    }

    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal)
    }

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    
  const [category, setCategory] = React.useState('Milestone');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleHeadingChange = (e) => {
    setHeading(e.target.value)
  }

    const handleSubmit = async () => {

      const formData = new FormData()

      formData.append('file_path', 'post-pics')
      formData.append('image', uploadedFile)

      const imageRes = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/images/upload`,{
        method: 'POST',
        body: formData,
      })

      const imageData = await imageRes.json()
      console.log(imageData)

      const modifiedImageUrl = imageData.filePath.replace('/app/public/', '');


      const res = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/posts/upload`,{
        method: 'POST',
        body: JSON.stringify({
          postAuthor: profileData.member_id,
          postCategory: category,
          postHeading: heading,
          postText: content,
          postImg: modifiedImageUrl

        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      console.log(data)
      setHeading(null)
      setUploadedFile(null)
      toggleModal()
    }



    return (
        <>
            <button onClick={toggleModal} className={styles['createBlog']}>
                Create new post
            </button>

            {modal && (
                <div className={styles['modal']}>
                    <div
                        onClick={toggleModal}
                        className={styles['overlay']}
                    ></div>
                    <div className={styles['modal-content']}>
                        <div className={styles['titleContainer']}>
                            <input
                                type="text"
                                className={styles['titleTextBox']}
                                placeholder="Title of the Post"
                                onChange={handleHeadingChange}
                                value={heading}
                                style={{ margin: '10px', outline: 'none' }}
                            />
                            <div className={styles['DateCategoryContainer']}>
                                <p>{formatDateToText()}</p>
                                <PostCategory category={category} onCategoryChange={handleCategoryChange}/>
                            </div>
                        </div>

                        <button
                            className={styles['close-modal']}
                            onClick={toggleModal}
                        >
                            <CloseRoundedIcon />
                        </button>
                        <div className={styles['textBoxContainer']}>
                            <PostModalTextBox onContentChange={handleContentChange}/>
                        </div>
                        <div className={styles['dropboxContainer']}>
                            <DropBox uploadError={uploadError} uploadedFile={uploadedFile} fileRef={fileRef} onFileUpload={handleFileUpload} />
                        </div>
                        <button
                            className={styles['uploadButton']}
                            onClick={handleSubmit}
                            disabled={!category || !content || !uploadedFile}
                        > 
                            Upload
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
