import React from "react";
import { Fragment } from "react";
import { Button } from "@mui/material";
import MentorData from "./MentorData";
import { Link } from "react-router-dom";
import useCustomModal from "../../../hooks/useCustomModal";

function MentorCards() {
  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    CustomModal,
  } = useCustomModal();
  return (
    <>
      <CustomModal
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        content={
          <Fragment>
            <div className="w-full m-0">
              <center>
                <h1 className="text-2xl font-bold mb-2">Apply to Endorse</h1>
                <h3 className="text-lg">
                  You are attempting to invite Sparkpoint for you to endorse.
                </h3>
                <div className="flex">
                  <input type="text" />
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
                      handleDeleteFAQ();
                    }}
                    // disabled={isLoading}
                  >
                    End
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
