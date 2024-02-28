import { useState, useEffect, Fragment } from "react";
import styles from "./PanelContent.module.css";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import useLoadProfile from "../../hooks/useLoadProfile";
import useAccessToken from "../../hooks/useAccessToken";
import { Link, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { Delete } from "@mui/icons-material";
import useHttp from "../../hooks/http-hook";

import { fetchImage } from "../../hooks/image-hook";
import SocialMediaShare from "../../components/SocialMediaShare/SocialMediaShare";

import { Button } from "@mui/material";

import useCustomModal from "../../hooks/useCustomModal";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";

function PanelContent(props) {
  const { filteredPosts } = props;
  const navigate = useNavigate();
  const { sendRequest, isLoading } = useHttp();
  const [showShareComponent, setShowShareComponent] = useState(false);
  const [postId, setPostId] = useState();
  const [selectedId, setSelectedID] = useState();
  const [pinnedPosts, setPinnedPosts] = useState([]);
  const [pinnedContent, setPinnedContent] = useState();

  useEffect(() => {
    const fetchPinnedPosts = async () => {
      try {
        const storedPinnedPosts = await sendRequest({
          url: `${import.meta.env.VITE_BACKEND_DOMAIN}/posts/pin/get`
        })
        
        // console.log('storedPinnedPosts: ', storedPinnedPosts);
        setPinnedPosts([storedPinnedPosts.post_id]);
      } catch (error) {
        console.error('Error fetching pinned posts:', error);
      }
    }

    fetchPinnedPosts();
  }, [])

  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    CustomModal,
  } = useCustomModal();
  const {
    handleClose: handleCloseSnackbar,
    showSnackbar,
    SnackbarComponent,
  } = useCustomSnackbar();

  const closeShareComponent = () => {
    setShowShareComponent(false);
  };

  const showShare = (e, id) => {
    e.stopPropagation();
    setPostId(id);
    setShowShareComponent(true);
  };

  const handleDeletePost = async () => {
    const res = await sendRequest({
      url: `${import.meta.env.VITE_BACKEND_DOMAIN}/posts/delete`,
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify that you are sending JSON data
      },
      body: JSON.stringify({
        post_id: selectedId,
        username: filteredPosts[0].setting_institution,
      }),
    });

    if (res.message === "Post deleted successfully") {
      handleCloseModal();
      showSnackbar("Post Deleted Successfully", "success");
      window.location.reload();
    } else {
      showSnackbar("Delete Unsuccessful", "error");
    }
    setPinnedPosts(pinnedPosts.filter((post) => post !== selectedId));
  };

  const pinPost = async (postId) => {
    setPinnedPosts([postId]);
    await sendRequest({
      url: `${import.meta.env.VITE_BACKEND_DOMAIN}/posts/pin`,
      method: 'POST',
      body: JSON.stringify({
        postId: postId
      })
    })
  
    // console.log(res);

  };

  // useEffect(() => {
  //   setPinnedPosts([JSON.stringify(pinnedPosts)]);
  // }, [pinnedPosts]);

  return (
    <>
    {pinnedPosts.map((pinnedPostId, index) => {
        const pinnedPost = filteredPosts.find(
          (post) => post.post_id === pinnedPostId
        );
        return (
          pinnedPost && (
            <div className={styles["PinnedPostCotainer"]} key={index}>
              <div
                className={styles["PinnedPostContent"]}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/posts/${pinnedPost.post_id}`, {
                    state: {
                      post: pinnedPost,
                    },
                  });
                }}
               
              >
                <div className={styles["titleImageContainer"]}>
                  <img
                    src={
                      pinnedPost.postPic &&
                      URL.createObjectURL(pinnedPost.postPic)
                    }
                    alt=""
                  />
                </div>
                <div className={styles["contentDetail"]}>
                  <div className={styles["ShareCategoryContainer"]}>
                    <div className={styles["ChipsContainer"]}>
                      <Stack direction="row">
                        <Chip
                          label={pinnedPost.post_category}
                          sx={{
                            backgroundColor:
                              pinnedPost.post_category === "Milestone"
                                ? "#fd7c06"
                                : "#054eae",
                            color: "#fff",
                            padding: "5px",
                          }}
                        />
                      </Stack>
                      <Stack direction="row" alignItems="center">
                        <IconButton size="medium">
                          <PushPinRoundedIcon sx={{ color: "#FF7A00" }} />
                        </IconButton>
                        <p>Pinned Post</p>
                      </Stack>
                    </div>
                    {/* Add other actions/buttons as needed */}
                  </div>
                  <div className={styles["contentHeading"]}>
                    <div className={styles["titleContainer"]}>
                      <h2>{pinnedPost.post_heading}</h2>
                    </div>
                    <p>
                      <Moment format="MMMM DD, YYYY">
                        {pinnedPost.post_dateadded}
                      </Moment>
                    </p>
                  </div>
                  <p>
                    {pinnedPost.post_bodytext.split(" ").slice(0, 50).join(" ")}
                    <span style={{ color: "#fd7c06" }}>
                      {pinnedPost.post_bodytext.split(" ").length > 50
                        ? "... See More"
                        : ""}
                    </span>
                  </p>
                  <div className={styles["contentFooter"]}>
                    <div className={styles["PostUserProfile"]}>
                      <img
                        src={URL.createObjectURL(pinnedPost.profilePic)}
                        alt="User Profile"
                      />
                      <h2>{pinnedPost.author}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        );
      })}
      <SnackbarComponent />
      {showShareComponent && (
        <SocialMediaShare
          type={"Post"}
          id={`/posts-view.php?post_id=${postId}`}
          setClose={closeShareComponent}
        />
      )}
      {filteredPosts.map((post, index) => {
        const isPinned = pinnedPosts.includes(post.post_id);
        const handlePinClick = (e) => {
          e.stopPropagation();
          pinPost(post.post_id);
          //   window.location.reload();
        };
        if (!pinnedPosts.includes(post.post_id)) {
          return (
            <div className={styles["PostContent"]} key={post.post_id}>
              <div
                className={styles["PostCards"]}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/posts/${post.post_id}`, {
                    state: {
                      post,
                    },
                  });
                }}
              >
                <div className={styles["titleImageContainer"]}>
                  <img
                    src={post.postPic && URL.createObjectURL(post.postPic)}
                    alt=""
                  />
                </div>

                <div className={styles["contentDetail"]}>
                  <div className={styles["ShareCategoryContainer"]}>
                    <div className={styles["ChipsContiner"]}>
                      <Stack direction="row">
                        <Chip
                          label={post.post_category}
                          sx={{
                            backgroundColor:
                              post.post_category === "Milestone"
                                ? "#fd7c06"
                                : "#054eae",
                            color: "#fff",
                            padding: "5px",
                          }}
                        />
                      </Stack>
                    </div>
                    <Stack
                      direction="row"
                      alignItems="center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedID(post.post_id);
                        handleOpenModal();
                      }}
                    >
                      <IconButton size="medium">
                        <Delete />
                      </IconButton>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      onClick={handlePinClick}
                    >
                      <IconButton size="medium">
                        <PushPinRoundedIcon
                          style={{ color: isPinned ? "#FF7A00" : "" }}
                        />
                      </IconButton>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      onClick={(e) => showShare(e, post.post_id)}
                    >
                      <IconButton size="medium">
                        <ShareIcon />
                      </IconButton>
                    </Stack>
                  </div>
                  <div className={styles["contentHeading"]}>
                    <div className={styles["titleContainer"]}>
                      <h2>{post.post_heading}</h2>
                    </div>
                    <p>
                      <Moment format="MMMM DD, YYYY">
                        {post.post_dateadded}
                      </Moment>
                    </p>
                  </div>
                  <p>
                    {post.post_bodytext.split(" ").slice(0, 50).join(" ")}
                    <span style={{ color: "#fd7c06" }}>
                      {post.post_bodytext.split(" ").length > 50
                        ? "... See More"
                        : ""}
                    </span>
                  </p>
                  <div className={styles["contentFooter"]}>
                    <div className={styles["PostUserProfile"]}>
                      <img
                        src={URL.createObjectURL(post.profilePic)}
                        alt="User Profile"
                      />
                      <h2>{post.author}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
      <CustomModal
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        content={
          <Fragment>
            <div className="modal-content">
              <center>
                <h1>Delete This Post?</h1>
                <h3>Are you sure to delete this post?</h3>
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
                    onClick={handleDeletePost}
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
    </>
  );
}

export default PanelContent;
