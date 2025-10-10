const express = require("express");
const app = express();
const books = require("./data.js");

app.use(express.json()); // parse json body content

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.get("/api/books/:bookID", (req, res) => {
  const id = Number(req.params.bookID);
  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).send("book not found");
  }
  res.json(book);
});

app.post("/api/books", (req, res) => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author || !publishedYear) {
    return res
      .status(400)
      .json({ message: "Title, author, and publishedYear are required" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    publishedYear,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
