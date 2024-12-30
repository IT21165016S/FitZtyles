import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, updateUser } from "../store/actions/user.action";

import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  let error = useSelector((state) => state.user.authError);
  const [frontendError, setFrontendError] = useState("");
  const { palette } = useTheme();

  const [username, setUsername] = useState(user?.user?.username);
  const [firstName, setFirstName] = useState(user?.user?.firstName || "");
  const [lastName, setLastName] = useState(user?.user?.lastName || "");
  const [bio, setBio] = useState(user?.user?.bio || "");
  const [gender, setGender] = useState(user?.user?.gender || "");
  const [profileImage, seProfileImage] = useState(
    user?.user?.profileImagePath || ""
  );
  const [isProfileCreated, setIsProfileCreated] = useState(
    user?.user?.profileCreated
  );

  const handleSubmit = (e) => {
    setFrontendError(null);
    e.preventDefault();

    if (firstName === "" || lastName === "") {
      setFrontendError("Need to have both first and last names");
      return;
    }

    const userData = {
      id: user.user.id,
      username: user.user.username,
      firstName,
      lastName,
      bio,
      gender,
      isProfileCreated: true,
      profileImage: profileImage,
    };
    console.log("before form", userData);
    dispatch(updateUser(userData)).then(() => {
      navigate("/");
    });
  };

  const handleDelete = (e) => {
    dispatch(deleteUser(user.user.id));
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      seProfileImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error when reading image: ", error);
    };
  };

  return (
    <div>
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
            <Typography
              fontWeight="500"
              variant="h5"
              sx={{ mb: "1rem", gridColumn: "span 4" }}
            >
              Let's add your information!
            </Typography>
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
            <Box
              border={`2px dashed ${palette.primary.main}`}
              p="1rem"
              width="100%"
            >
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={convertToBase64}
              />
              {profileImage && (
                <div>
                  <img
                    width={100}
                    height={100}
                    src={profileImage}
                    alt="recipe"
                  />
                </div>
              )}
            </Box>
            <TextField
              label="First Name"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              name="firstName"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Last Name"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              name="lastName"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Bio"
              type="text"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              name="bio"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              select
              label="Gender"
              type="text"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              name="gender"
              sx={{ gridColumn: "span 4" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"MALE"}>Male</MenuItem>
              <MenuItem value={"FEMALE"}>Female</MenuItem>
            </TextField>
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              type="submit"
              sx={{
                m: "2rem 1rem",
                p: "1rem",
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
                "&:hover": {
                  color: palette.primary.main,
                  cursor: "pointer",
                },
              }}
            >
              {user?.user?.profileCreated ? "UPDATE" : "CREATE"}
            </Button>

            <Button
              onClick={handleDelete}
              sx={{
                m: "2rem 1rem",
                p: "1rem",
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
                "&:hover": {
                  color: palette.primary.main,
                  cursor: "pointer",
                },
              }}
            >
              DELETE
            </Button>
            {/* <Typography
            onClick={() => {
              setFirstName("");
              setLastName("");
              setBio("")
              setGender("")
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
          </Typography> */}
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default ProfileUpdate;
