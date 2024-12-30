import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import CustomFlex from "../CustomFlex";
// import Friend from "components/Friend";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setPost } from "state";
import WidgetWrapper from "../WidgetWrapper";
import Friend from "./Friend";

const PostWidget = ({
  postId,
  postUserId,
  name,
  caption,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  hideFriendAddButton = false,
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

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        hideFriendAddButton={hideFriendAddButton}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {caption}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {name}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${picturePath}`}
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
    </WidgetWrapper>
  );
};

export default PostWidget;
