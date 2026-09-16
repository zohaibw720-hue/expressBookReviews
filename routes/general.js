const express = require("express");
const books = require("./booksdb.js");

const general = express.Router();

// Task 2: Get all books
general.get("/", (req, res) => {
  res.status(200).json(books);
});

// Task 3: Get book by ISBN
general.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  const book = Object.values(books).find(
    (book) => String(book.isbn) === String(isbn)
  );

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  res.status(200).json(book);
});

// Task 4: Get books by author
general.get("/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();

  const result = Object.values(books).filter(
    (book) =>
      String(book.author).toLowerCase() === author
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No books found for this author",
    });
  }

  res.status(200).json(result);
});

// Task 5: Get books by title
general.get("/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();

  const result = Object.values(books).filter(
    (book) =>
      String(book.title).toLowerCase() === title
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No books found for this title",
    });
  }

  res.status(200).json(result);
});

// Task 6: Get reviews for a specific book
general.get("/:isbn/review", (req, res) => {
  const isbn = req.params.isbn;

  const book = Object.values(books).find(
    (book) => String(book.isbn) === String(isbn)
  );

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  res.status(200).json(book.reviews);
});

module.exports.general = general;