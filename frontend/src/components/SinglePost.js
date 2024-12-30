import React from "react";

const SinglePost = ({ post, fetchType }) => {
  return (
    <div>
      <p>{post.caption}</p>
      <p>{post.createdAt}</p>
    </div>
  );
};

export default SinglePost;
