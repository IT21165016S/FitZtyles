import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostWall from "../components/PostWall";
import FriendListWidget from "../components/widgets/FriendListWidget";
import PostsWidget from "../components/widgets/PostsWidget";
import UserPostWidget from "../components/widgets/UserPostWidget";
import UserWidget from "../components/widgets/UserWidget";
import { getPosts } from "../store/actions/post.action";

const Home = () => {
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    // <div>
    //   <h2>WELCOME!</h2>
    //   <PostWall posts={postsData.posts} fetchType="ALL_POSTS" />
    // </div>
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user={user.user} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <UserPostWidget />
          <PostsWidget />
          <br></br>
          {/* <PostWall posts={postsData.posts} fetchType="ALL_POSTS" /> */}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <FriendListWidget userId={user.user.id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
