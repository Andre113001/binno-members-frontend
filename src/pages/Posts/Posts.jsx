import React, { useContext, useEffect, useState } from 'react'
// import {posts} from '../../assets/posts.js'

import SideBar from '../../components/Sidebar/Sidebar'
import Header from '../../components/header/Header'
import styles from './Posts.module.css'
import {
  StyledTabs, //parent component
  StyledTab,
  TabPanel,
} from "./Tabs";
import PanelContent from './PanelContent';
import NewPostModal from '../../components/newPostModal/newPostModal.jsx'
import SocialMediaShare from '../../components/SocialMediaShare/SocialMediaShare.jsx'
import useHttp from '../../hooks/http-hook.js';
import AccountContext from '../../context/accountContext.jsx';

const Posts = () => {
  const accContext = useContext(AccountContext)
  const [value, setValue] = useState(0);
  const { sendRequest, isLoading} = useHttp();

  const [posts, setPosts] = useState([])


  useEffect(() => {
      const loadData = async () => {
        const res = await sendRequest({
          url: `https://binno-members-repo-production-b8c4.up.railway.app/api/posts/user/${accContext.profileData.member_id}`
          
        })
        setPosts(res)
      }
      if(accContext.profileData) loadData()
    },[accContext])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={styles['PostPage']}>
      <SideBar />
      <div className={styles['layoutContainer']}>
          <div className={styles["Headline"]}>
            <Header />
          </div>
              <div className={styles["bodyContainer"]}>
                <div className={styles["buttonContainer"]}>
                  <h1>Categories</h1>
                  <NewPostModal/>
                </div>
                <div className={styles["tabContainer"]}>
                <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <StyledTab label="All Posts" />
                  <StyledTab label="Milestone"  />
                  <StyledTab label="Promotions" />
                </StyledTabs>
                <TabPanel value={value} index={0}>
                  <PanelContent filteredPosts={posts}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <PanelContent filteredPosts={posts.filter((post) => {
                    return post.post_category === 'Milestone';
                    })}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <PanelContent filteredPosts={posts.filter((post) => {
                    return post.post_category === 'Promotions';
                    })}/>
                </TabPanel>
                </div>
              </div>
        </div>        
      </div>
    </>
  )
}

export default Posts
