const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

// Import routes
const bookRoutes = require("./server/routes/bookRoutes");
app.use("/api/books", bookRoutes);

// Default route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
