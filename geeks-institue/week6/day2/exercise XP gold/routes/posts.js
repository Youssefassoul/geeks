const express = require("express");
const router = express.Router();

// In-memory array for blog posts
let posts = [];

// GET all posts
router.get("/", (req, res) => {
  res.json(posts);
});

// GET a post by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
});

// POST create a new post
router.post("/", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content required" });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    timestamp: new Date().toISOString(),
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT update a post by ID
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;

  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  if (title) post.title = title;
  if (content) post.content = content;
  post.timestamp = new Date().toISOString();

  res.json(post);
});

// DELETE a post by ID
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

module.exports = router;
