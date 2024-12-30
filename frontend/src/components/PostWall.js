import React, { useEffect, useState } from "react";
import SinglePost from "./SinglePost";

const PostWall = ({ posts, fetchType }) => {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    if (posts) {
      setPostsList(posts);
    }
  }, [posts]);

  return (
    <div>
      {postsList.length ? (
        [...postsList].reverse().map((post) => {
          return <SinglePost key={post.id} post={post} fetchType={fetchType} />;
        })
      ) : (
        <h5>No Posts yet...</h5>
      )}
    </div>
  );
};

export default PostWall;
