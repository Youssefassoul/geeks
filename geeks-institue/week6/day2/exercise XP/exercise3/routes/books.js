const express = require("express");
const router = express.Router();

// In-memory list of books
let books = [];

// GET all books
router.get("/", (req, res) => {
  res.json(books);
});

// POST create a new book
router.post("/", (req, res) => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author || !publishedYear) {
    return res.status(400).json({ error: "Title, author, and year required" });
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

// PUT update a book by ID
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, author, publishedYear } = req.body;

  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (publishedYear !== undefined) book.publishedYear = publishedYear;

  res.json(book);
});

// DELETE a book by ID
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books.splice(index, 1);
  res.json({ message: "Book deleted" });
});

module.exports = router;
