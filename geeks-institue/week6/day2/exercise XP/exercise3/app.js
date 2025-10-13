const express = require("express");
const app = express();
const booksRouter = require("./routes/books");

app.use(express.json()); // Parse JSON bodies
app.use("/books", booksRouter); // Mount router

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
