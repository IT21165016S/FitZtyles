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
import { setRecipes } from "../../store/slices/recipe.slice";
import CustomFlex from "../CustomFlex";
import UserImage from "../UserImage";
import WidgetWrapper from "../WidgetWrapper";

const UserPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [post, setPost] = useState("");
  const { palette } = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const category = "Breakfast";

  const [error, setError] = useState("");

  const user = useSelector((state) => state.user);

  const handlePost = async () => {
    // console.log("comes here");
    // if (title === "") {
    //   setError("Need to have a title");
    //   return;
    // }
    // const data = {
    //   userId: user.user.id,
    //   title,
    //   description,
    //   ingredients,
    //   image,
    //   category,
    // };
    // const response = await fetch(`http://localhost:8080/api/recipes/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    //   },
    //   body: JSON.stringify(data),
    // });
    // const posts = await response.json();
    // console.log("recipi save", posts);
    // dispatch(setRecipes({ posts }));
    // setImage(null);
    // setTitle("");
    // setDescription("");
    // setIngredients("");
  };

  return (
    <WidgetWrapper>
      <CustomFlex gap="1.5rem">
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
        <UserImage image={user.user.profileImage} />
        <InputBase
          placeholder="What is in your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </CustomFlex>

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
            "&:hover": {
              color: palette.primary.main,
              cursor: "pointer",
            },
          }}
        >
          <Typography
            // fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="white"
            sx={{
              alignItems: "right",
              "&:hover": {
                color: palette.primary.dark,
                cursor: "pointer",
              },
            }}
          >
            POST
          </Typography>
        </Button>
      </CustomFlex>
    </WidgetWrapper>
  );
};

export default UserPostWidget;
