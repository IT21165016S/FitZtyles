import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendListWidget from "../components/widgets/FriendListWidget";
import MyCreatedPostsWidget from "../components/widgets/MyCreatedPostsWidget";
import PostsWidget from "../components/widgets/PostsWidget";
import UserPostWidget from "../components/widgets/UserPostWidget";
import UserWidget from "../components/widgets/UserWidget";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const { userId } = useParams();
  const token = localStorage.getItem("Authorization");
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const currentUser = useSelector((state) => state.user);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_API_URL;

  const getUser = async () => {
    const response = await fetch(`${BACKEND_URL}/api/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log("user id", data);
    setUser(data);
  };

  useEffect(() => {
    getUser();
    if (currentUser.user.id === userId) setIsCurrentUser(true);
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user={user} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} hideFriendAddButton={true} />
          <Box m="2rem 0" />
          {isCurrentUser && <MyCreatedPostsWidget />}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {isCurrentUser && <UserPostWidget picturePath={user.picturePath} />}
          {/* <Box m="2rem 0" /> */}
          <PostsWidget userId={userId} isProfile hideFriendAddButton={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
