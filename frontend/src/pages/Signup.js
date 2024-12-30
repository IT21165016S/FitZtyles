import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../store/actions/user.action";

import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { setLogin } from "../store/slices/user.slice";

const Signup = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [frontendError, setFrontendError] = useState("");

  const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setError(null);
    setFrontendError(null);
    e.preventDefault();

    if (username === "" || password === "") {
      setFrontendError("Need to have both username and password");
      return;
    }

    const user = {
      username,
      password,
    };

    const response = await fetch(`${BASE_URL}/api/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      dispatch(setLogin(json));
      navigate("/");
    }
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
            REGISTER
          </Button>
          <Typography
            onClick={() => {
              setUsername("");
              setPassword("");
              navigate("/login");
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
            Already have an account? Login here
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default Signup;
