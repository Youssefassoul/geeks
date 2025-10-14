const Post = require("../models/postModel");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.getById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch {
    res.status(500).json({ message: "Error fetching post" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "Title and content required" });

    const [newPost] = await Post.create({ title, content });
    res.status(201).json(newPost);
  } catch {
    res.status(500).json({ message: "Error creating post" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const [updated] = await Post.update(req.params.id, { title, content });
    if (!updated) return res.status(404).json({ message: "Post not found" });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Error updating post" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deleted = await Post.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch {
    res.status(500).json({ message: "Error deleting post" });
  }
};
