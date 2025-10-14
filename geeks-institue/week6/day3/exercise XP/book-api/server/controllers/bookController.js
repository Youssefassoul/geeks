let books = require("../models/bookModel");

// Get all books
exports.getAllBooks = (req, res) => {
  res.json(books);
};

// Get one book
exports.getBookById = (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = books.find((b) => b.id === bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

// Create new book
exports.createBook = (req, res) => {
  const { title, author, publishedYear } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    publishedYear,
  };
  books.push(newBook);
  res.status(201).json(newBook);
};
