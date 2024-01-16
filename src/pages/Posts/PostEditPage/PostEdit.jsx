  import React, { useEffect, useRef, useState } from 'react'
  import { Link, useLocation, useNavigate } from 'react-router-dom'; 

  import Box from '@mui/material/Box';
  import TextField from '@mui/material/TextField';
  import Header from '../../../components/header/Header'
  import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
  import DropBox from '../../../components/dropbox/DropBox';


  import styles from './PostEdit.module.css'
import useLoadProfile from '../../../hooks/useLoadProfile';

  // const VisuallyHiddenInput = styled('input')({
  //   clip: 'rect(0 0 0 0)',
  //   clipPath: 'inset(50%)',
  //   height: 1,
  //   overflow: 'hidden',
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   whiteSpace: 'nowrap',
  //   width: 1,
  // });


  function PostEdit() {
    const navigate = useNavigate()
      const location = useLocation()
      const receivedData = location.state
      const [titleInput, setTitleInput] = useState()
      const [titleDescription, setDescription] = useState()
    const [postData, setPostData] = useState({
      title: '',
      description: '',
    });

    const handleTitleChange = (event) => {
      setTitleInput(event.target.value)
    };
    
    // image

    const handleDescriptionChange = (event) => {
      setDescription(event.target.value)
    };


    useEffect(() => {
      const loadData = () => {
          if(receivedData){ 
            setPostData(receivedData.post)
             setTitleInput(receivedData.post.post_heading)
             setDescription(receivedData.post.post_bodytext)
            }
      }
      loadData()
    }, [receivedData])
    
    // const handleChange = (e) => {
    //   setEventData((prevData) => ({
    //     ...prevData,
    //     [e.target.id]: e.target.value,
    //   }));
    // };

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

    const handleSubmit = async(e) => {
      e.preventDefault();

      
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


      console.log({
        postId: location.state.post_id,
        postAuthor: profileData.member_id,
        postHeading: titleInput,
        postText: titleDescription,
        postImg: modifiedImageUrl

      })

      const res = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/posts/upload`,{
        method: 'POST',
        body: JSON.stringify({
          postId: location.state.post_id,
          postAuthor: profileData.member_id,
          postHeading: titleInput,
          postText: titleDescription,
          postImg: modifiedImageUrl

        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      console.log(data)
    };


    return (
      <>
          <div className={styles['EventPageContainer']}>
              <Header />
              <div className={styles['contentContainer']}>
                  <div className={styles['ButtonContainer']}>
                    <div className={styles['backButtonContainer']}>
                      <Link to="/posts" style={{textDecoration:'none'}}>
                      <button className={styles['backButton']} ><ArrowBackRoundedIcon />
                        <span style={{margin:'5px'}}>Discard Changes</span>
                      </button>
                      </Link>
                    </div>

                    <button className={styles['publishBtn']} type='submit' onClick={() => {
                      handleSubmit()
                      navigate('/posts')
                      }}>
                      Save Changes
                    </button>
                    
                  </div>
                  <form className={styles['formContainer']} onSubmit={handleSubmit}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '1000px' },
                    }}
                  >
                    <div className={styles['titleContainer']}>
                      <input
                        id='title'
                        value={titleInput}
                        onChange={handleTitleChange}
                        placeholder="Enter your title here..."
                        style={{border: 'none', padding: '10px', fontSize: '40px', fontWeight: '700', width:'100%', outline:'none'}}
                      />
                    </div>
                    <div className={styles['ImageContainer']}>
                    {/* <DropBox uploadError={uploadError} uploadedFile={uploadedFile} fileRef={fileRef} onFileUpload={handleFileUpload} /> */}
                        </div>
                    <div className={styles['descriptionContainer']}>
                      <TextField
                        id='description'
                        value={titleDescription}
                        onChange={handleDescriptionChange}
                        multiline
                        placeholder="What is it all about?"
                        style={{border: 'none', padding: '10px', fontSize: '18px', width:'98%', outline:'none'}}
                        minRows={6}
                        maxRows={7}
                      />
                    </div>
                    </Box>
                  </form>
              </div>
          </div>
      </>
    )
  }

  export default PostEdit;