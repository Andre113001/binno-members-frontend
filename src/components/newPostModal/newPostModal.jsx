import React, { useState, useEffect, useCallback } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import styles from "./newPostModal.module.css"
import MultiImageUpload from '../multiImageUpload/MultiImageUpload.jsx'
import PostModalTextBox from './PostModalTextBox'
import PostCategory from './Categories.jsx'

export default function NewPostModal() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(()=> { 
    const interValId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
  
    return () => clearInterval(interValId);

  }, []);
  
  const formatDateToText = () => {
    const dateYear = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return currentDate.toLocaleDateString(undefined, dateYear);
  }; 

    const [modal, setModal] = useState(false);    
    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }  
  
    return (
    <>
    <button onClick={toggleModal} className={styles["createBlog"]}>
            Create new post
        </button>

        {modal && (
            <div className={styles["modal"]}>
              <div onClick={toggleModal} className={styles["overlay"]}></div>
                <div className={styles["modal-content"]}>
                    <div className={styles["titleContainer"]}>
                        <input 
                          type="text"
                          className={styles["titleTextBox"]}
                          placeholder='Create new post' 
                        />
                        <div className={styles["DateCategoryContainer"]}>
                          <p>{formatDateToText()}</p>
                        <PostCategory />
                        </div>
                    </div>

                    <button className={styles["close-modal"]} onClick={toggleModal}>
                    <CloseRoundedIcon />
                    </button>
                    <div className={styles["textBoxContainer"]}>
                      <PostModalTextBox />
                    </div>
                    <div className={styles["dropboxContainer"]}>
                      <MultiImageUpload />
                    </div>
                    <button className={styles["uploadButton"]} onClick={toggleModal}>  
                      Upload
                    </button>
                </div>
            </div>
        )}
    </>
  )
}
