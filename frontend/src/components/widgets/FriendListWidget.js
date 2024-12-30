import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../store/slices/user.slice";
import WidgetWrapper from "../WidgetWrapper";
import Friend from "./Friend";

const FriendListWidget = ({ userId, hideFriendAddButton = false }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const token = localStorage.getItem("Authorization");
  const friends = useSelector((state) => state.user.friends);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_API_URL;

  const getFriends = async () => {
    const response = await fetch(`${BACKEND_URL}/api/users/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setFriends(data));
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friends
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend.id}
            friendId={friend.id}
            name={`${friend.firstName} ${friend.lastName}`}
            userPicturePath={friend.profileImage}
            hideFriendAddButton={hideFriendAddButton}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
