import React from "react";
import SearchBar from "../../../../components/Search Bar/Searchbar";
import Mentors from "./Mentor_data";
import useCustomModal from "../../../../hooks/useCustomModal";
import { Fragment } from "react";
import { Button } from "@mui/material";
import AddMentorButton from "../../AddMentors/AddMentorButton";

function MentorList() {
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
                <h1 className="text-3xl font-bold mb-2">
                  Are you sure you want to end partnership?
                </h1>
                <h3 className="text-lg">
                  Your partnership will permanently be ended.
                </h3>
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
                      handleEndPartnership();
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
      <div className="flex flex-col w-full">
        {/* mentor list */}
        <SearchBar />
        <div className="flex flex-col mt-10 w-[80%]">
          {Mentors.map((mentor) => (
            <div key={mentor.id} className="flex ">
              {/* profile image */}
              <div className="absolute ml-5 p-3 bg-[#F4F4F4] rounded-full">
                <img
                  className=" w-20 h-20 rounded-full"
                  src={mentor.mentorProfile}
                  alt="Mentor Profile"
                />
              </div>
              {/* mentor cards */}
              <div className="ml-24 mb-6 shadow-md flex flex-row items-center bg-white rounded-xl w-full h-[100px]">
                {/* profile container */}
                <div className="flex items-center grow">
                  <h1 className="ml-20 text-2xl font-bold">
                    {mentor.mentorName}
                  </h1>
                </div>
                <button
                  className="mx-20 text-red-600 text-lg outline-none"
                  onClick={(e) => {
                    handleOpenModal();
                  }}
                >
                  End Partnership
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddMentorButton />
    </>
  );
}

export default MentorList;
