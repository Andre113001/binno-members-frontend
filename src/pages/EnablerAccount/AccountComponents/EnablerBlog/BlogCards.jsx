import React, { useState, useEffect } from "react";
import useAccessToken from "../../../../hooks/useAccessToken";
import styles from "./BlogCards.module.css";
import { Link, useNavigate } from "react-router-dom";

const BlogCards = (props) => {
  const [blog, setBlog] = useState([]);
  const profileData = props.profileData;
  const accessToken = useAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    const loadHeadingData = async () => {
      if (profileData) {
        const profile = profileData;
        const fetchGuides = await fetch(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/blogs/user/${
            profile.member_id
          }`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        fetchGuides.json().then((result) => {
          // Get the first two items from the result array
          const firstThreeResults = result.slice(0, 3);
          setBlog(firstThreeResults);
        });
      }
    };

    loadHeadingData();
  }, [profileData]);

  return (
    <>
      {/* className={styles["BlogPage"]} */}
      <section className="w-[550px] h-[450px] bg-white my-5 rounded-lg shadow-lg p-1">
        <div className={styles["titleContainer"]}>
          <h1 className="text-3xl font-bold">Recent Blogs</h1>
          <a href="/blogs">View all blogs...</a>
        </div>
        <div className={styles["content"]}>
          {blog.map((item) => (
            <div
              className={styles["boxItems"]}
              key={item.blog_id}
              onClick={() =>
                navigate(`/blogs/${item.blog_id}`, {
                  state: { item },
                })
              }
            >
              <div className={styles["img"]}>
                <img
                  src={`${
                    import.meta.env.VITE_BACKEND_DOMAIN
                  }/images?filePath=blog-pics/${item.blog_img}`}
                />
              </div>
              <div className={styles["details"]}>
                <h3>{item.blog_title}</h3>
                <div className={styles["date"]}>
                  <h4>{item.blog_datedadded}</h4>
                </div>
                <p>
                  {item.blog_content.slice(0, 150)}...
                  <span style={{ color: "#fd7c06" }}>SEE MORE</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogCards;
