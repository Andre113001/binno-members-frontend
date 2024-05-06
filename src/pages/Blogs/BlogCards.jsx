import React, { useState, useEffect, Fragment } from "react";
import styles from "./BlogCard.module.css";
import useLoadProfile from "../../hooks/useLoadProfile";
import { Link, useNavigate } from "react-router-dom";
import useAccessToken from "../../hooks/useAccessToken";
import SocialMediaShare from "../../components/SocialMediaShare/SocialMediaShare";
import Moment from "react-moment";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import { fetchImage } from "../../hooks/image-hook";
import useHttp from "../../hooks/http-hook";
import { Button } from "@mui/material";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import useCustomModal from "../../hooks/useCustomModal";

const BlogCards = () => {
  const { sendRequest, isLoading } = useHttp();
  const [blogs, setBlogs] = useState([]);
  const { profileData } = useLoadProfile();
  const accessToken = useAccessToken();
  const [imageSrc, setImageSrc] = useState();
  const [loading, setLoading] = useState(true);
  const [showShareComponent, setShowShareComponent] = useState(false);
  const navigate = useNavigate();
  const [blogId, setBlogId] = useState();
  const [selectedId, setSelectedID] = useState();

  const {
    handleClose: handleCloseSnackbar,
    showSnackbar,
    SnackbarComponent,
  } = useCustomSnackbar();
  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    CustomModal,
  } = useCustomModal();

  useEffect(() => {
    const loadHeadingData = async () => {
      try {
        setLoading(true);
        if (profileData) {
          const profile = profileData;
          const guidesQuery = await fetch(
            `${import.meta.env.VITE_BACKEND_DOMAIN}/blogs/user/${
              profile.member_id
            }`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          const guidesResult = await guidesQuery.json();

          const promises = guidesResult.map(async (guide) => {
            const blogPic = await fetchImage(`blog-pics/${guide.blog_img}`);
            const newBlob = new Blob([blogPic], { type: "image/jpeg" });

            return { ...guide, blogPic: newBlob };
          });

          const results = await Promise.all(promises);

          setBlogs(results);
        }
      } finally {
        setLoading(false);
      }
    };

    loadHeadingData();
  }, [profileData, accessToken]);

  console.log(blogs);

  const closeShareComponent = () => {
    setShowShareComponent(false);
  };

  const showShare = (e, id) => {
    e.stopPropagation();
    setBlogId(id);
    setShowShareComponent(true);
  };

  const handleDeleteBlog = async () => {
    const res = await sendRequest({
      url: `${import.meta.env.VITE_BACKEND_DOMAIN}/blogs/delete`,
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify that you are sending JSON data
      },
      body: JSON.stringify({
        blogId: selectedId,
        username: profileData.setting_institution,
      }),
    });

    if (res.message === "Blog deleted successfully") {
      handleCloseModal();
      showSnackbar("Blog Deleted Successfully", "success");
      window.location.reload();
    } else {
      showSnackbar("Delete Unsuccessful", "error");
    }
  };

  return (
    <>
      <SnackbarComponent />
      <CustomModal
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        content={
          <Fragment>
            <div className="modal-content">
              <center>
                <h1>Delete This Blog?</h1>
                <h3>Are you sure to delete this Blog?</h3>
                <div className="modal-button">
                  <Button
                    sx={{
                      height: "80px",
                      background: "#FF7A00",
                      border: "1px solid #FF7A00",
                      width: "280px",
                      borderRadius: "10px",
                      "&:hover": {
                        background: "#FF7A00",
                      },
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    onClick={(e) => {
                      handleDeleteBlog();
                    }}
                    disabled={isLoading}
                  >
                    Confirm
                  </Button>
                  <Button
                    sx={{
                      height: "80px",
                      border: "1px solid #000",
                      width: "280px",
                      borderRadius: "10px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#000",
                    }}
                    onClick={handleCloseModal}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </center>
            </div>
          </Fragment>
        }
      />
      <section className={styles["content"]}>
        <div className={styles["grid2"]}>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div className={styles["boxItems"]} key={index}>
                  <Skeleton variant="rectangular" width="100%" height={300} />
                  <div className={styles["blogContent"]}>
                    <div className={styles["details"]}>
                      <Skeleton
                        variant="text"
                        width="80%"
                        sx={{ margin: "20px" }}
                      />
                      <Skeleton
                        variant="text"
                        width="60%"
                        sx={{ margin: "20px" }}
                      />
                      <Skeleton
                        variant="text"
                        width="90%"
                        sx={{ margin: "20px" }}
                      />
                    </div>
                  </div>
                </div>
              ))
            : blogs?.map((blog) => (
                <div
                  onClick={() =>
                    navigate(`/blogs/${blog.blog_id}`, {
                      state: { blog },
                    })
                  }
                  className={styles["boxItems"]}
                  key={blog.blog_id}
                >
                  {/* image container */}
                  <div className="flex mr-6">
                    <div className={styles["img"]}>
                      <img src={URL.createObjectURL(blog.blogPic)} alt="" />
                    </div>
                  </div>
                  {/* className={styles["blogContent"]} */}
                  <div className="w-full">
                    <div className={styles["details"]}>
                      {/* className={styles["titleDeleteContainer"]} */}
                      <div className="flex flex-row">
                        <div className="flex flex-col grow">
                          <h3>{blog.blog_title}</h3>
                          <p>
                            Published:{" "}
                            <Moment format="MMMM DD, YYYY">
                              {blog.blog_dateadded}
                            </Moment>
                          </p>
                        </div>

                        <Stack
                          direction="row"
                          alignItems="center"
                          sx={{ marginRight: "10px" }}
                          onClick={(e) => showShare(e, blog.blog_id)}
                        >
                          <IconButton size="large">
                            <ShareIcon />
                          </IconButton>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          margin={"0 15px"}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedID(blog.blog_id);
                            handleOpenModal();
                          }}
                        >
                          <IconButton aria-label="delete" size="large">
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </div>

                      <p>{blog.blog_content.slice(0, 250)}...</p>
                    </div>
                  </div>
                </div>
                // </Link>
              ))}
        </div>
      </section>
    </>
  );
};

export default BlogCards;
