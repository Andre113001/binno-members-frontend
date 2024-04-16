import React, { useEffect, useState } from "react";
import "./RegistrationForm.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StyledToggleButton from "../../components/ToggleButton/ToggleButton";
import useHttp from "../../hooks/http-hook";

function RegistrationForm() {
  const navigate = useNavigate();
  const { sendRequest, isLoading } = useHttp();
  const [formData, setFormData] = useState({
    institution: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const destroyToken = () => {
      localStorage.clear();
      setFormData({
        institution: "",
        email: "",
        address: "",
        type: "Company"
      });
    };

    destroyToken();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the entered value matches the email regex
    // if (name === "email" && !emailRegex.test(value)) {
    //   setError("Please enter a valid email address");
    // } else {
    //   setError("");
    // }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setButtonDisabled(true);
  
    // Check if all required fields are filled in
    if (!formData.institution || !formData.email || !formData.address) {
      setError("Please fill in all required fields.");
      setButtonDisabled(false);
      return; // Prevent further execution of the function
    }
  
    try {
      const res = await sendRequest({
        url: `${import.meta.env.VITE_BACKEND_DOMAIN}/register/`,
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.appId) {
        localStorage.setItem("app_id", res.appId);
        localStorage.setItem("form_info", JSON.stringify(formData));
        navigate("/register/upload");
      } else {
        setError(
          "Email or Institution Name is already registered to the platform or possibly application is still ongoing. Contact us if you have any troubles."
        );
        setButtonDisabled(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("An unexpected error occurred.");
      setButtonDisabled(false);
    }
  };
  

  return (
    <>
      <div className="formPage">
        <h1>Become a Member</h1>
        <div className="switchUserContainer">
          {/* Assuming StyledToggleButton is a custom component */}
          <StyledToggleButton currentPage={"Company"} />
        </div>
        <p>Please fill up the required fields. </p>

        <form className="formContent" onSubmit={handleSubmit}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { mb: 3, width: "35ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="institute"
                label="Name of Institution"
                value={formData.institution}
                required
                name="institution"
                onChange={handleChange}
                error={Boolean(error)}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 10%)",
                }}
              />
            </div>
            <div>
              <TextField
                id="email"
                label="E-mail"
                type="email" // Set type prop to "email" for email validation
                inputMode="email" // Set inputMode to "email" for better browser support
                value={formData.email}
                required
                name="email"
                onChange={handleChange}
                error={Boolean(error)}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 10%)",
                }}
              />
            </div>
            <div>
              <TextField
                id="address"
                label="Address"
                value={formData.address}
                required
                name="address"
                onChange={handleChange}
                error={Boolean(error)}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "5px 5px 5px 5px rgb(0 0 0 / 10%)",
                }}
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Box>
          <div>
            <button
              className="registerButton"
              type="submit"
              disabled={isLoading || buttonDisabled}
            >
              Next
            </button>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Link to="/">Already a member? Sign-in here</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegistrationForm;
