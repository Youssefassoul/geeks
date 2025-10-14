const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());

const todoRoutes = require("./server/routes/todoRoutes");
app.use("/api/todos", todoRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
