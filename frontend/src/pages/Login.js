import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/actions/user.action";
import { setLogin } from "../store/slices/user.slice";

import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  // const error = useSelector((state) => state.user.LoginError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [frontendError, setFrontendError] = useState("");
  const [error, setError] = useState("");

  const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFrontendError(null);

    if (username === "" || password === "") {
      setFrontendError("Need to have both username and password");
      return;
    }

    const user = {
      username,
      password,
    };

    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    console.log("login res", response);

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      dispatch(setLogin(json));
      navigate("/");
    }

    // dispatch(login(user)).then((action) => {
    //   localStorage.setItem("UserId", action.payload.userId);
    //   localStorage.setItem("Authorization", action.payload.accessToken);
    //   navigate("/");
    // });

    // const loggedInResponse = await fetch(`${BASE_URL}/api/users/login`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(user),
    // });

    // const loggedIn = await loggedInResponse.json();

    // console.log("logged in", loggedIn);

    // if (loggedIn) {

    //   navigate("/");
    // }
  };

  return (
    <Box
      width={"25%"}
      p="2rem"
      m="2rem auto"
      borderRadius="1.5rem"
      backgroundColor="white"
    >
      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: "span 4" },
          }}
        >
          {frontendError && (
            <Box
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{ gridColumn: "span 8", input: { color: "red" } }}
            >
              <Typography color="red">{frontendError}</Typography>
            </Box>
          )}
          {error && (
            <Box
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{ gridColumn: "span 8", input: { color: "red" } }}
            >
              <Typography color="red">{error}</Typography>
            </Box>
          )}
          <TextField
            label="Email"
            type="email"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="username"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            sx={{ gridColumn: "span 4" }}
          />
        </Box>

        {/* BUTTONS */}
        <Box>
          <Button
            fullWidth
            type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: "#880e4f",
              color: "white",
              "&:hover": { color: "blue" },
            }}
          >
            LOGIN
          </Button>
          <Typography
            onClick={() => {
              setUsername("");
              setPassword("");
              setFrontendError("");
              navigate("/signup");
            }}
            sx={{
              textDecoration: "underline",
              color: "blue",
              "&:hover": {
                cursor: "pointer",
                color: "blue",
              },
            }}
          >
            Don't have an account? Sign Up here.
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
