import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import logo from "../../icon.svg";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import useHttp from "../../hooks/http-hook";
import { MuiOtpInput } from "mui-one-time-password-input";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [currentSection, setCurrentSection] = useState(1);
  const [otp, setOtp] = useState("");
  const [accesskey, setAccessKey] = useState();
  const [accessKeyError, setAccessKeyError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [overallError, setOverallError] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0); // Initialize attempt count
  const [otpCompleted, setOtpCompleted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { sendRequest, isLoading } = useHttp();
  const [ password, setPassword ] = useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOtpChange = (newValue) => {
    setOtp(newValue);
    setOverallError(false);
  };

  const matchIsString = (text) => {
    return typeof text === "string";
  };

  const matchIsNumeric = (text) => {
    const isNumber = typeof text === "number";
    const isString = matchIsString(text);
    return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
  };

  const validateChar = (value, index) => {
    return matchIsNumeric(value);
  };

  const handleOtpComplete = async (value) => {
    setOtpCompleted(true);
    const requestDataOtp = {
      accesskey: accesskey,
      otp: value,
    };
    const res = await sendRequest({
      url: `${import.meta.env.VITE_BACKEND_DOMAIN}/login/verify`,
      method: "POST",
      body: JSON.stringify(requestDataOtp),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (res.auth === 1) {
      localStorage.setItem("access", res.token);
      navigate("/getting-started");
    } else if (res.auth === 0) {
      localStorage.setItem("access", res.token);
      navigate("/account");
    } else {
      setOverallError(true);
      // setAttemptCount(prevCount => prevCount + 1); // Increment attempt count
      // if (attemptCount >= 2) { // Check if attempt count exceeds threshold
      //     window.location.reload();
      // } else {
      //     setOtpCompleted(false);
      // }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const accessKey = data.get("access-key");
    const password = data.get("password");

    if (!accessKey) {
      setAccessKeyError(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }

    try {
      const res = await sendRequest({
        url: `${import.meta.env.VITE_BACKEND_DOMAIN}/login`,
        method: "POST",
        body: JSON.stringify({ accessKey, password }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (res.twoAuth) {
        setCurrentSection(2);
        setAccessKey(accessKey);
      } else {
        setOverallError(true); // Set overallError to true when res.twoAuth is false
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="" width={350} />
        {currentSection === 1 && (
          <>
            <Typography
              fontWeight={"bold"}
              className="sm:text-sm"
              component="h1"
              variant="h5"
            >
              Members Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                error={accessKeyError || overallError}
                helperText={
                  (accessKeyError && "Access Key is required") ||
                  (overallError && "Invalid Access Key")
                }
                margin="normal"
                required
                fullWidth
                id="access-key"
                label="Access Key"
                name="access-key"
                autoComplete="off"
                autoFocus
                onChange={(e) => {
                  setAccessKey(e.target.value); // Update the access key
                  setAccessKeyError(false); // Clear accessKeyError when the user starts typing
                  setOverallError(false); // Clear overallError when the user starts typing
                }}
              />

              <TextField
                error={passwordError || overallError}
                helperText={
                  (passwordError && "Password is required") ||
                  (overallError && "Invalid Password")
                }
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                sx={{ mt: 1, mb: 2 }}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false); // Clear passwordError when the user starts typing
                  setOverallError(false); // Clear overallError when the user starts typing
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, p: 1.5 }}
                style={{
                  backgroundColor: "#ff7a00",
                }}
                disabled={isLoading}
              >
                Sign-in
              </Button>
            </Box>
            <Link sx={{ mt: 3 }} href="/forgot">
              Forgot Password?
            </Link>

            <div style={{ marginTop: "20px" }}>
              <Link sx={{ mt: 3 }} href="/register">
                Sign-up for membership here
              </Link>
            </div>
          </>
        )}
        {currentSection === 2 && (
          <>
            <Box sx={{ mt: 1 }}>
              <Typography textAlign={"center"} fontWeight={"bold"} variant="h5">
                Two-factor Athentication
              </Typography>
              <Typography textAlign={"center"}>
                To verify your login, we've sent a one-time-pin to your email
                address, kindly input your OTP below.
              </Typography>
              <MuiOtpInput
                TextFieldsProps={{
                  placeholder: "#",
                  error: overallError,
                  disabled: otpCompleted,
                }}
                style={{ marginTop: 20 }}
                onComplete={handleOtpComplete}
                length={6}
                value={otp}
                onChange={handleOtpChange}
                validateChar={validateChar}
              />
              {overallError && (
                <>
                  <Typography
                    variant="body2"
                    align="center"
                    color="error"
                    margin={3}
                  >
                    Invalid OTP
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="error"
                    margin={3}
                  >
                    Remaining: ({attemptCount}/3)
                  </Typography>
                </>
              )}
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Login;
