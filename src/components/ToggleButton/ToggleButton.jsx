import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function StyledToggleButton(props) {
  const { currentPage } = props;

  const [alignment, setAlignment] = useState(
    currentPage ? currentPage : "Company"
  );

  useEffect(() => {
    if (alignment !== null) {
      console.log(alignment);
    }
  }, [alignment]);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton
        value={"Company"}
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#5aaed5", 
            fontWeight: "bold",
          },
        }}
      >
        <Link
          to={{ pathname: "/register", state: { page: "0" } }}
          style={{ textDecoration: "none", color: "black" }}
        >
          Start-up Company
        </Link>
      </ToggleButton>
      <ToggleButton
        value={"Enabler"}
        sx={{
          "&.Mui-selected": {
            backgroundColor: "#5aaed5",
            fontWeight: "bold",
          },
        }}
      >
        <Link
          to={{ pathname: "/register/enabler", state: { page: "1" } }}
          style={{ textDecoration: "none", color: "black" }}
        >
          Start-up Enabler
        </Link>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
