import {
  ChatBubbleOutlineOutlined,
  DeleteOutlined,
  EditOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CustomFlex from "../CustomFlex";
// import Friend from "components/Friend";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setPost } from "state";
import { useNavigate } from "react-router-dom";
import { deleteRecipe, updateRecipe } from "../../store/actions/recipe.action";
import WidgetWrapper from "../WidgetWrapper";
import Friend from "./Friend";

const RecipeWidget = ({
  recipeId,
  recipeUserId,
  name,
  title,
  image,
  description,
  ingredients,
  userImage,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user.user.id);
  // const isLiked = Boolean(likes[loggedInUserId]);
  // const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedIngredients, setUpdatedIngredients] = useState(ingredients);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const functionopenpopup = () => {
    setOpen(true);
  };
  const functionclosepopup = () => {
    setOpen(false);
  };

  // const patchLike = async () => {
  //   const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
  //     method: "PATCH",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userId: loggedInUserId }),
  //   });
  //   const updatedPost = await response.json();
  //   dispatch(setPost({ post: updatedPost }));
  // };
  const handleUpdate = async () => {
    console.log("comes here");
    if (updatedTitle === "") {
      setError("Need to have a title");
      return;
    }

    const data = {
      id: recipeId,
      userId: loggedInUserId,
      title: updatedTitle,
      description: updatedDescription,
      ingredients: updatedIngredients,
    };

    console.log("updated data", data);

    dispatch(updateRecipe(data)).then(functionclosepopup);
  };

  const handleDelete = (recipeId) => {
    dispatch(deleteRecipe(recipeId));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend friendId={recipeUserId} name={name} userPicturePath={userImage} />
      <Typography color={main} sx={{ mt: "1rem" }}>
        <h2>{title}</h2>
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        <h4>Ingredients:</h4> {ingredients}
      </Typography>
      {image && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${image}`}
        />
      )}
      <CustomFlex mt="0.25rem">
        <CustomFlex gap="1rem">
          <CustomFlex gap="0.3rem">
            {/* <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton> */}
            {/* <Typography>{likeCount}</Typography> */}
          </CustomFlex>

          <CustomFlex gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            {/* <Typography>{comments.length}</Typography> */}
          </CustomFlex>
          {loggedInUserId === recipeUserId && (
            <>
              <CustomFlex gap="0.3rem">
                <IconButton onClick={functionopenpopup}>
                  <EditOutlined />
                </IconButton>
              </CustomFlex>
              <CustomFlex gap="0.3rem">
                <IconButton onClick={() => handleDelete(recipeId)}>
                  <DeleteOutlined />
                </IconButton>
              </CustomFlex>
            </>
          )}
        </CustomFlex>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </CustomFlex>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
      <Dialog open={open} fullWidth>
        <DialogTitle>Update Your Post</DialogTitle>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 2fr))"
          sx={{
            "& > div": { gridColumn: "span 4" },
            // border: "2px solid #ccc", // Add border
            borderRadius: "20px", // Add border radius
            // boxShadow: "0px 0px 5px rgba(0, 0,0, 0.5)", // Add box shadow
            padding: "20px", // Add padding
          }}
        >
          {/* <Divider sx={{ margin: "1.25rem 0" }} /> */}
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
              onChange={(e) => setUpdatedTitle(e.target.value)}
              value={updatedTitle}
              placeholder={title}
              name="title"
              sx={{ gridColumn: "span 8" }}
            />
            <TextField
              label="Description"
              type="text"
              onChange={(e) => setUpdatedDescription(e.target.value)}
              value={updatedDescription}
              placeholder={description}
              name="description"
              sx={{ gridColumn: "span 8" }}
            />
            <TextField
              label="Ingredients"
              type="text"
              onChange={(e) => setUpdatedIngredients(e.target.value)}
              value={updatedIngredients}
              placeholder={ingredients}
              name="ingredients"
              sx={{ gridColumn: "span 8" }}
            />
          </Box>
          <DialogActions>
            <Button
              // disabled={!post}
              onClick={handleUpdate}
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
                UPDATE
              </Typography>
            </Button>
            <Button
              // disabled={!post}
              onClick={functionclosepopup}
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
                CANCEL
              </Typography>
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </WidgetWrapper>
  );
};

export default RecipeWidget;
