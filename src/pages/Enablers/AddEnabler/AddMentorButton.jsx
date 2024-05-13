import React from "react";
import IconButton from "@mui/material/IconButton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Link } from "react-router-dom";

function AddMentorButton() {
  return (
    <>
      <div className="fixed bottom-10 right-40 ">
        <Link to={"/mentor/addMentor"}>
          <IconButton
            aria-label="Add"
            size="large"
            sx={{ width: "70px", height: "70px", bgcolor: "#FF7A00" }}
          >
            <AddRoundedIcon sx={{ color: "white" }} fontSize="large" />
          </IconButton>
        </Link>
      </div>
    </>
  );
}

export default AddMentorButton;
