import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getPostsByUserId } from "../../store/actions/post.action";
import PostWidget from "./PostWidget";

const PostsWidget = ({
  userId,
  isProfile = false,
  hideFriendAddButton = false,
}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("Authorization");

  // const getUserPosts = async () => {
  //   const response = await fetch(
  //     `http://localhost:3001/posts/${userId}/posts`,
  //     {
  //       method: "GET",
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   );
  //   const data = await response.json();
  //   dispatch(setPosts({ posts: data }));
  // };

  useEffect(() => {
    if (isProfile) {
      console.log("comes hereeeeee");
      dispatch(getPostsByUserId(userId));
    } else {
      dispatch(getPosts());
    }
  }, []);

  return (
    <>
      {posts.map(
        ({
          id,
          userId,
          username,
          caption,
          // location,
          profileImage,
          imgLink,
          // likes,
          // comments,
        }) => (
          <PostWidget
            key={id}
            postId={id}
            postUserId={userId}
            name={username}
            caption={caption}
            // location={location}
            picturePath={profileImage}
            userPicturePath={imgLink}
            hideFriendAddButton={hideFriendAddButton}
            // likes={likes}
            // comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
