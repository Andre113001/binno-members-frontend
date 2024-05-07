import React from "react";
import { Fragment } from "react";
import { currentPartner, previousPartners } from "./Partnership_data";
import useCustomModal from "../../../../hooks/useCustomModal";
import { Button } from "@mui/material";

function Partnership() {
  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    CustomModal,
  } = useCustomModal();

  const hasPartner = false;

  return (
    <>
      <CustomModal
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        content={
          <Fragment>
            <div className="w-full m-0 flex ">
              <center>
                <h1 className="text-3xl font-bold mb-2">End Partnership</h1>
                <h3 className="text-lg">
                  This will allow to end your partnership with the current
                  enabler.
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
      {/* page container */}
      <div className="flex flex-col">
        {/* conditional rendering for mentor without a partner */}
        {hasPartner ? (
          <>
            {/* apply now container */}
            <div className="flex flex-col bg-white p-8 rounded-lg w-[85%] shadow-lg mb-10">
              {/* content container */}
              <div className="flex flex-col items-center justify-center">
                <h1>IT'S EMPTY HERE. APPLY PARTNERSHIP TO STARTUP ENABLERS.</h1>
                <button className="mt-2 bg-[#FF7A00] text-white px-5 py-2 rounded-lg">
                  Apply Now
                </button>
              </div>
            </div>
          </>
        ) : (
          // conditional rendering for mentors with a partner
          <>
            {/* current partner card */}
            <div className="flex items-end flex-row bg-white p-10 rounded-lg w-[85%] mb-10 shadow-md">
              {/* image and mentor container */}
              <div className="flex grow">
                {currentPartner.map((part) => (
                  <div className="flex " key={part.id}>
                    {/* image container */}
                    <div className="flex mr-14">
                      <img
                        className="w-40 h-40 rounded-full object-cover"
                        src={part.partnerPorfile}
                        alt="Partner Profile"
                      />
                    </div>
                    {/* title date container */}
                    <div className="flex flex-col justify-center">
                      <h1 className="text-[#5C9FEF] text-3xl font-bold">
                        {part.partnerName}
                      </h1>
                      <p className="mt-6 text-md">Start: {part.startingDate}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="text-[#EB5858] text-lg mx-10 outline-none"
                onClick={(e) => {
                  handleOpenModal();
                }}
              >
                End Partnership
              </button>
            </div>
          </>
        )}
        {/* history tab container*/}
        <div className="flex flex-col bg-white p-4 pb-0 rounded-lg w-[85%] shadow-lg">
          <h1 className="text-[#5C9FEF] text-3xl font-bold mb-4">History</h1>
          {/* previous partner container */}
          {previousPartners.map((prev) => (
            // card container
            <div className="flex flex-col border-b-[1px] p-5" key={prev.id}>
              {/* content container */}
              <div className="items-center flex flex-row">
                <img
                  className="w-20 h-20 rounded-full mr-10 object-cover"
                  src={prev.partnerPorfile}
                  alt="Partner Profile"
                />
                {/* name and dates container */}
                <div className="flex flex-col justify-center">
                  <h1 className="text-xl mt-2 font-semibold">
                    {prev.partnerName}
                  </h1>
                  <p className="text-sm mt-2">Start: {prev.startingDate}</p>
                  <p className="text-sm mt-2">End: {prev.endDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Partnership;
