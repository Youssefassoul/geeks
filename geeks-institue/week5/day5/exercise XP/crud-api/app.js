const express = require("express");
const app = express();
const { fetchPosts } = require("./data/dataService");
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await fetchPosts(); // fetch data from dataService
    console.log("Posts successfully retrieved and sent as response.");
    res.json(posts); // respond with the fetched data
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});
app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
