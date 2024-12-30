import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendListWidget from "../components/widgets/FriendListWidget";
import MyCreatedPostsWidget from "../components/widgets/MyCreatedPostsWidget";
import PostsWidget from "../components/widgets/PostsWidget";
import RecipesWidget from "../components/widgets/RecipesWidget";
import UserPostWidget from "../components/widgets/UserPostWidget";
import UserWidget from "../components/widgets/UserWidget";

const MyRecipes = () => {
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

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
          <UserWidget user={user.user} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <RecipesWidget userId={user.user.id} />
        </Box>
      </Box>
    </Box>
  );
};

export default MyRecipes;
