import React, { useState, useEffect } from "react";
import { guide } from "../../../../assets/EnablerAccountData";
import useAccessToken from "../../../../hooks/useAccessToken";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./GuidesCards.module.css";
import { Link, useNavigate } from "react-router-dom";
import Moment from "react-moment";

const GuideCards = (props) => {
  const profileData = props.profileData;
  const accessToken = useAccessToken();
  const [guides, setGuides] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const loadHeadingData = async () => {
      if (profileData) {
        const profile = profileData;
        const fetchGuides = await fetch(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/programs/user/${
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
          const firstThreeResults = result.slice(0, 1);
          setGuides(firstThreeResults);
        });
      }
    };

    loadHeadingData();
  }, [profileData]);

  return (
    <>
      <section className="bg-white p-5 rounded-lg shadow-lg h-[300px] h-max-[400px] w-[1000px]">
        <div className={styles["titleContainer"]}>
          <h1 className="text-3xl font-bold">Recent Guide</h1>
          <a href="/guides">View all Guides...</a>
        </div>
        <div className={styles["flexContainer"]}>
          {guides?.map((item) => (
            <div className={styles["guideContent"]} key={item.program_id}>
              <div className={styles["guideImage"]}>
                <img
                  src={`${
                    import.meta.env.VITE_BACKEND_DOMAIN
                  }/images?filePath=guide-pics/${item.program_img}`}
                  alt=""
                />
              </div>
              <div className={styles["guideFooter"]}>
                <div className={styles["TitleDateContainer"]}>
                  <h2>{item.program_heading}</h2>
                  <p className={styles["guideDate"]}>
                    Last accessed:{" "}
                    <Moment format="MMMM DD, YYYY">
                      {item.program_datemodified}
                    </Moment>
                  </p>
                </div>
                <div className={styles["editButton"]}>
                  <button
                    onClick={() => navigate(`/guides/${item.program_id}`)}
                  >
                    View and Edit <EditIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default GuideCards;
