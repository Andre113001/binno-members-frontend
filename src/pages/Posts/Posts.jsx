import { useContext, useEffect, useState } from 'react';
import SideBar from '../../components/Sidebar/Sidebar';
import Header from '../../components/header/Header';
import styles from './Posts.module.css';
import {
  StyledTabs,
  StyledTab,
  TabPanel,
} from './Tabs';
import PanelContent from './PanelContent';
import NewPostModal from '../../components/newPostModal/newPostModal.jsx';
import useHttp from '../../hooks/http-hook.js';
import useLoadProfile from '../../hooks/useLoadProfile';
import useAccessToken from '../../hooks/useAccessToken';
import { fetchImage } from '../../hooks/image-hook.js';

import { CircularProgress } from '@mui/material'



const Posts = () => {
  const [value, setValue] = useState(0);
  const { sendRequest, isLoading } = useHttp();
  const { profileData } = useLoadProfile();
  const accessToken = useAccessToken();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedID] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);



  useEffect(() => {
    const loadHeadingData = async () => {
      try {
        setLoading(true);
        if (profileData) {
          const profile = await profileData;
          const guidesQuery = await fetch(
            `${import.meta.env.VITE_BACKEND_DOMAIN}/posts/user/${profile.member_id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
    
          const guidesResult = await guidesQuery.json();
    
          if (Array.isArray(guidesResult)) {
            // Process the data if it's an array
            const promises = guidesResult.map(async (guide) => {
              const postPic = await fetchImage(`post-pics/${guide.post_img}`);
              const profilePic = await fetchImage(`profile-img/${profileData.setting_profilepic}`);
    
              return { ...guide, postPic: postPic, profilePic: profilePic, author: profileData.setting_institution };
            });
    
            const results = await Promise.all(promises);
            setPosts(results);
            setDataLoaded(true);
          } else {
            // Handle the case where guidesResult is not an array
            setPosts([]);
            setDataLoaded(true);
          }
        }
      } finally {
        setLoading(false);
      }
    };    

    loadHeadingData();
  }, [profileData, accessToken]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDeletePost = async (id) => {
    // Your delete post logic here
    try {
      // Perform delete request
      showSnackbar('Post Deleted Successfully', 'success');
      handleCloseModal(); // Close the modal after successful deletion
    } catch (error) {
      showSnackbar('Error deleting post', 'error');
    }
  };

  return (
    <>
      <div className={styles['PostPage']}>
        <SideBar />
        <div className={styles['layoutContainer']}>
          <div className={styles['Headline']}>
            <Header />
          </div>
          <div className={styles['bodyContainer']}>
            <div className={styles['buttonContainer']}>
              <h1>Categories</h1>
              <NewPostModal />
            </div>
            <div className={styles['tabContainer']}>
              <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <StyledTab label="All Posts" />
                <StyledTab label="Milestone" />
                <StyledTab label="Promotions" />
              </StyledTabs>
              <TabPanel value={value} index={0}>
                {dataLoaded ? (
                  posts.length > 0 ? (
                    <PanelContent 
                      filteredPosts={posts} 
                      handleDeletePost={handleDeletePost}
                    />
                  ) : (
                    <div className={styles['partial']}> 
                      <h3>No posts</h3>
                    </div>
                  )
                ) : (
                  <div className={styles['partial']}> 
                    <CircularProgress />
                  </div>
                )}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {dataLoaded ? (
                  posts.length > 0 ? (
                    <PanelContent 
                      filteredPosts={posts.filter((post) => post.post_category === 'Milestone')} 
                      handleDeletePost={handleDeletePost}
                    />
                    ) : (
                      <div className={styles['partial']}> 
                        <h3>No posts</h3>
                      </div>
                    )
                  ) : (
                    <div className={styles['partial']}> 
                      <CircularProgress />
                    </div>
                  )}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {dataLoaded ? (
                  posts.length > 0 ? (
                    <PanelContent 
                      filteredPosts={posts.filter((post) => post.post_category === 'Promotion')} 
                      handleDeletePost={handleDeletePost}
                    />
                    ) : (
                      <div className={styles['partial']}> 
                        <h3>No posts</h3>
                      </div>
                    )
                  ) : (
                    <div className={styles['partial']}> 
                      <CircularProgress />
                    </div>
                  )}
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
