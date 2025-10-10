const express = require("express");
const app = express();
const posts = require("./data.js");

app.use(express.json()); // parse json body content

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.get("/api/posts/:postID", (req, res) => {
  const id = Number(req.params.postID);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).send("post not found");
  }
  res.json(post);
});
// parse json body content

app.post("/api/posts", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put("/api/posts/:postID", (req, res) => {
  const id = Number(req.params.postID);
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    return res.status(404).send("Post not found");
  }
  const updatedpost = {
    id: posts[index].id,
    title: req.body.title,
    content: req.body.content,
  };
  posts[index] = updatedpost;
  res.status(200).json("Post updated");
});

app.delete("/api/posts/:postID", (req, res) => {
  const id = Number(req.params.postID);
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    return res.status(404).send("Post not found");
  }
  posts.splice(index, 1);
  res.status(200).json("Post deleted");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
