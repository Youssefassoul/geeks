import React from "react";
import posts from "./posts.json";

function PostList() {
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>Hi This is a Title</h1>
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;