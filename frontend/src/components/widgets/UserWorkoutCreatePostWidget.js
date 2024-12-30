import {
  AttachFileOutlined,
  DeleteOutlined,
  EditOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
// import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setWorkouts } from "../../store/slices/workout.slice";
import CustomFlex from "../CustomFlex";
import UserImage from "../UserImage";
import WidgetWrapper from "../WidgetWrapper";

const UserWorkoutCreatePostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const { palette } = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState("");

  const user = useSelector((state) => state.user);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_API_URL;

  const handlePost = async () => {
    console.log("comes here");
    if (title === "") {
      setError("Need to have a title");
      return;
    }

    const data = {
      userId: user.user.id,
      title,
      image,
      description,
    };

    console.log("workout form data", data);

    const response = await fetch(`${BACKEND_URL}/api/workouts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
      },
      body: JSON.stringify(data),
    });

    const post = await response.json();

    console.log("workoput save", post);

    dispatch(setWorkouts(post));
    setImage(null);
    setTitle("");
    setDescription("");
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error when reading image: ", error);
    };
  };

  return (
    <WidgetWrapper>
      <CustomFlex gap="1.5rem">
        {/* {error && (
          <Box
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{ gridColumn: "span 8", input: { color: "red" } }}
          >
            <Typography color="red">{error}</Typography>
          </Box>
        )} */}
        <UserImage image={user.user.profileImage} />
        <Typography
          color={mediumMain}
          fontSize="1.3rem"
          sx={{
            width: "100%",
          }}
        >
          Let's Add A New Workout Plan!
        </Typography>
      </CustomFlex>
      <Divider sx={{ margin: "1.25rem 0" }} />
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: "span 4" },
        }}
      >
        <TextField
          label="Title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          sx={{ gridColumn: "span 8" }}
        />
        <TextField
          label="Description"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          name="description"
          sx={{ gridColumn: "span 8" }}
        />
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
          {image && (
            <div>
              <img width={100} height={100} src={image} alt="workout" />
            </div>
          )}
        </Box>
      </Box>

      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          {/* <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <CustomFlex>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <CustomFlex>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </CustomFlex>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </CustomFlex>
            )}
          </Dropzone> */}
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <CustomFlex>
        <CustomFlex gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </CustomFlex>

        {isNonMobileScreens ? (
          <>
            <CustomFlex gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </CustomFlex>

            <CustomFlex gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </CustomFlex>

            <CustomFlex gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </CustomFlex>
          </>
        ) : (
          <CustomFlex gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </CustomFlex>
        )}

        <Button
          // disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          <Typography
            // fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="white"
            sx={{ alignItems: "right" }}
          >
            POST
          </Typography>
        </Button>
      </CustomFlex>
    </WidgetWrapper>
  );
};

export default UserWorkoutCreatePostWidget;
