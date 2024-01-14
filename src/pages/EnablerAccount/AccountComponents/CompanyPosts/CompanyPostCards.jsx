import React from 'react'
import styles from './CompanyPostCards.module.css'
import { posts } from '../../../../assets/posts'
import { Link } from 'react-router-dom'

const PostCards = () => {

    console.log(posts)
  return (
    <>
        <section className={styles["PostsPage"]}>     
            <div className={styles["titleContainer"]}>
                <h1>Recent Posts</h1>
                <a href="">View all posts...</a>
            </div>
            <div className={styles["content"]}>
                {posts?.map((item)=> (
                <Link to='#' style={{textDecoration: 'none'}}>
                    <div className={styles["boxItems"]} key={item.id}> 
                        <div className={styles["userInfoContainer"]}>
                            <img src={item.userProfile} alt='' style={{margin: '20px',width: '60px',height:'auto',borderRadius: '50%'}}/>

                                <div className={styles["UserDateContainer"]}>
                                    <h3>{item.user}</h3>
                                    <p>{item.date}</p>
                                </div>
                        </div>
                            <div className={styles["img"]}>
                                <img src={item.cover} alt='' />
                            </div>
                        <div className={styles["details"]}>
                            <h3>{item.title}</h3>
                            <p>{item.description.slice(0,150)}...</p>    
                        </div>
                    </div>
                </Link>
                ))} 
            </div>
        </section>
    </>
  ) 
}

export default PostCards;