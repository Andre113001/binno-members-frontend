import React, { useState, useEffect } from "react";
import useAccessToken from "../../../../hooks/useAccessToken";
import styles from "./EventCard.module.css";
import { Link, useNavigate } from "react-router-dom";

const Events = (props) => {
  const [events, setEvents] = useState([]);
  const profileData = props.profileData;
  const accessToken = useAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    const loadHeadingData = async () => {
      if (profileData) {
        const profile = profileData;
        const fetchGuides = await fetch(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/events/user/${
            profile.member_id
          }`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        fetchGuides.json().then((result) => {
          const firstTwoResults = result.slice(0, 2);
          setEvents(firstTwoResults);
        });
      }
    };

    loadHeadingData();
  }, [profileData]);

  // console.log(events);

  return (
    <>
      {/* className={styles['EventPage']} */}
      <section className="w-[830px] h-[450px] bg-white mt-5 ml-3 shadow-lg rounded-lg p-3">
        <div className={styles["titleContainer"]}>
          <h1 className="text-3xl font-bold">Recent Events</h1>
          <a href="/events">View all Events...</a>
        </div>
        <hr />
        <div className={styles["content"]}>
          {events.map((item) => (
            <div
              className={styles["boxItems"]}
              key={item.event_id}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/events/${item.event_id}`, {
                  state: {
                    item,
                  },
                });
              }}
            >
              <div className={styles["details"]}>
                <div className={styles["eventDateContainer"]}>
                  <div className={styles["TitleContainer"]}>
                    <a href="">
                      <h3>{item.event_title}</h3>
                    </a>
                  </div>
                  <div className={styles["date"]}>
                    <h4>{item.event_date}</h4>
                  </div>
                </div>
                <p>
                  {item.event_description.slice(0, 250)}
                  <span style={{ color: "#fd7c06" }}>...CLICK TO VIEW</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Events;
