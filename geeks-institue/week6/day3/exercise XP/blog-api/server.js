const express = require("express");
const postRoutes = require("./server/routes/postRoutes");

const app = express();
app.use(express.json());

app.use("/posts", postRoutes);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.listen(3000, () => console.log("Server running on port 3000"));
