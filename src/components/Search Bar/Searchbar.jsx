import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Paper } from "@mui/material";
import Button from "@mui/material";

function SearchBar() {
  return (
    <>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "80%",
          border: "1px solid #D9D9D9",
          borderRadius: "15px",
          height: "55px",
        }}
      >
        <IconButton sx={{ marginLeft: "4px" }} aria-label="searchIcon">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search for a topic"
          inputProps={{ "aria-label": "Search for a topic" }}
        />
        <button className=" bg-[#599EF3] h-[55px] px-6 py-2 rounded-xl text-white">
          Search
        </button>
      </Paper>
    </>
  );
}

export default SearchBar;
