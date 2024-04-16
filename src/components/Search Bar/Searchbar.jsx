import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Paper } from "@mui/material";

function SearchBar() {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "80%",
        border: "1px solid #D9D9D9",
        borderRadius: "15px",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder="Search for a topic"
        inputProps={{ "aria-label": "Search for a topic" }}
      />
    </Paper>
  );
}

export default SearchBar;
