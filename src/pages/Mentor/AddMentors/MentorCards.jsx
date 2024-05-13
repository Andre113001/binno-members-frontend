import React from "react";
import { Fragment } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import useCustomModal from "../../../hooks/useCustomModal";
import FileUploadButton from "../../../components/FileUploadButton/FileUploadButton";
import SuccessfulUpload from "./SuccessfulUpload";
import { useState, useEffect, useRef } from "react";
import { useHttp } from "../../../hooks/http-hook"; // Assuming this hook handles HTTP requests

function MentorCards() {
  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    CustomModal,
  } = useCustomModal();

  const [formData, setFormData] = useState({
    to: "", // Mentor ID
    message: "",
  });

  const [selectedMentor, setSelectedMentor] = useState(null); // Stores selected mentor data
  const [mentors, setMentors ] = useState([]);

  const { sendRequest } = useHttp();
  const messageRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest({
          url: `${import.meta.env.VITE_BACKEND_DOMAIN}/mentors/list`,
        });

        if (!response) {
          throw new Error("Failed to fetch mentors");
        }

        const mentors = await response;
        setMentors(mentors);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchData();
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedMentor) {
      console.error("Please select a mentor");
      return; // Handle error if no mentor is selected
    }
    const message = messageRef.current ? messageRef.current.value : formData.message; // Use either ref or state value
    console.log("Selected mentor ID:", selectedMentor.member_id);
    console.log("Mentor ID: ", selectedMentor.member_id);
  
    try {
  
      const bodyData = {
        enablerId:"f252d4",
        mentorId: selectedMentor.member_id,
        senderId:"f252d4",
        message, // Include requestId in bodyData
      };

      console.log("msg", message);
  
      const res = await sendRequest({
        url: `${import.meta.env.VITE_BACKEND_DOMAIN}/mentors/request/create`,
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" },
      });
  
      if (res.message === "Mentorship request created successfully") {
        console.log("Submitted form data:", formData);
        <SuccessfulUpload />; // Assuming SuccessfulUpload displays success message
        handleCloseModal();
        window.location.reload(); // Optional: Reload page to reflect changes
      } else {
        console.error("Error creating mentorship request:", res.message); // Handle error message
      }
    } catch (error) {
      console.error("Error occurred:", error.message); // Handle other errors
    }
  };
  return (
    <>
       <CustomModal
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        content={
          <Fragment>
            <div className="w-full h-full m-0">
              <center>
                <h1 className="text-2xl font-bold mb-2">Apply to Endorse</h1>
                <h3 className="text-lg">
                  You are attempting to invite {selectedMentor && selectedMentor.name} for you to endorse.
                </h3> {/* Display selected mentor name if available */}

                <div className="flex border px-2 py-4 rounded-lg my-4">
                  <span className="to-label">To:</span>
                  <input
                    type="text"
                    className="w-full ml-2"
                    name="to"
                    value={selectedMentor && selectedMentor.name} // Display selected mentor name (read-only)
                    disabled // Disable input field
                  />
                </div>

                <div className="flex border px-1 py-2 rounded-lg h-60">
                <textarea
  className="w-full"
  rows="10"
  cols="35"
  style={{ maxHeight: "230px" }}
  name="message"
  ref={messageRef}
/>
                </div>

                <div className="flex flex-col items-start my-2">
                  <h1>Show your credentials</h1>
                  <div className="flex w-full mt-2">
                    <FileUploadButton /> {/* Assuming FileUploadButton handles file upload */}
                  </div>
                </div>

                <div className="flex flex-row">
                  <Button
                    sx={{
                      marginTop: "20px",
                      border: "1px solid #5C9FEF",
                      width: "50%",
                      borderRadius: "10px",
                      padding: "10px 20px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#5C9FEF",
                      "&:hover": {
                        background: "#5C9FEF",
                        color: "#fff",
                      },
                    }}
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      marginTop: "20px",
                      marginLeft: "20px",
                      background: "#EB5858",
                      border: "1px solid #EB5858",
                      padding: "10px 20px",
                      width: "50%",
                      borderRadius: "10px",
                      "&:hover": {
                        background: "#E20000",
                      },
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    onClick={handleSubmit} // Call handleSubmit on click
                  >
                    Send
                  </Button>
                </div>
              </center>
            </div>
          </Fragment>
        }
      />
      <div className="flex items-center justify-center ml-58 w-[75%] ">
        <div className="grid grid-cols-4 w-full gap-0">
          {mentors.map((mentor) => (
            <Link
              key={mentor.id} // Add key prop for performance
              onClick={() => {
                setSelectedMentor(mentor); // Set selected mentor on click
                handleOpenModal();
              }}
            >
              <div className="flex items-center justify-center" key={mentor.member_id}>
                {/* card container (parent container)*/}
                <div className="flex flex-col justify-center items-center max-h-82 w-48  ">
                  {/* profilePic Container */}
                  <div className="relative flex items-center justify-center rounded-full p-1 bg-white h-24 w-24 translate-y-14 ">
                    <img
                      className="flex h-20 w-20 rounded-full object-cover"
                      src={mentor.profile_pic}
                      alt="Profile Picture"
                    />
                  </div>
                  {/* background design */}
                  <div className="pt-8 rounded-xl p-5 pb-8 bg-gradient-to-b from-[#cbdcf1] from-24% to-white to-13%">
                    {/* username and bio design */}
                    <div className="pt-8 rounded-2xl bg-white h-[280px] w-[252px]">
                      {/* content container */}
                      <div className="flex justify-center flex-col">
                        <div className="flex items-start ml-4 font-bold text-xl text-black">
                          {mentor.name}
                        </div>
                        <div className="flex items-start m-5 text-black text-sm h-6">
                          {mentor.biography}
                        </div>
                        <img
                          className="flex h-full w-full min-h-36 max-h-34 min-w-58 max-w-64 object-fill object-center rounded-b-xl"
                          src={mentor.cover_pic}
                          alt="Profile Cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default MentorCards;
