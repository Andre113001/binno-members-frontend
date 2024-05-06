import React from "react";
import { Fragment } from "react";
import { Button } from "@mui/material";
import MentorData from "./MentorData";
import { Link } from "react-router-dom";
import useCustomModal from "../../../hooks/useCustomModal";
import FileUploadButton from "../../../components/FileUploadButton/FileUploadButton";
import SuccessfulUpload from "./SuccessfulUpload";
import { useState } from "react";

function MentorCards() {
  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    CustomModal,
  } = useCustomModal();

  const [formData, setFormData] = useState({
    to: "",
    message: "",
  });

  //   const handleChange = (event) => {
  //     setFormData({ ...formData, [event.target.name]: event.target.value });
  //   };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Submitted form data:", formData); // Example logging
    <SuccessfulUpload />;
    handleCloseModal();
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
                  You are attempting to invite Sparkpoint for you to endorse.
                </h3>
                {/* text areas  */}
                <div className="flex border px-2 py-4 rounded-lg my-4">
                  <span className="to-label">To:</span>
                  <input
                    type="text"
                    className="w-full ml-2"
                    name="to"
                    // value={formData.to}
                  />
                </div>
                <div className="flex border px-1 py-2 rounded-lg h-60">
                  <textarea
                    className="w-full"
                    rows="10"
                    cols="35"
                    style={{ maxHeight: "230px" }}
                    name="message"
                    // value={formData.message}
                    // onChange={}
                  >
                    Text
                  </textarea>
                </div>
                {/* credentials container */}
                <div className="flex flex-col items-start my-2">
                  <h1>Show your credentials</h1>
                  <div className="flex w-full mt-2">
                    <FileUploadButton />
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
                    // disabled={isLoading}
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
                    onClick={(e) => {
                      handleSubmit();
                    }}
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
          {MentorData.map((mentor) => (
            <Link
              onClick={(e) => {
                handleOpenModal();
              }}
            >
              <div className="flex items-center justify-center" key={mentor.id}>
                {/* card container (parent container)*/}
                <div className="flex flex-col justify-center items-center max-h-82 w-48  ">
                  {/* profilePic Container */}
                  <div className="relative flex items-center justify-center rounded-full p-1 bg-white h-24 w-24 translate-y-14 ">
                    <img
                      className="flex h-20 w-20 rounded-full object-cover"
                      src={mentor.mentorProfile}
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
                          {mentor.username}
                        </div>
                        <div className="flex items-start m-5 text-black text-sm h-6">
                          {mentor.mentorBio}
                        </div>
                        <img
                          className="flex h-full w-full min-h-36 max-h-34 min-w-58 max-w-64 object-fill object-center rounded-b-xl"
                          src={mentor.mentorCover}
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
