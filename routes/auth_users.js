const express = require("express");
const jwt = require("jsonwebtoken");
const books = require("./booksdb.js");

const regd_users = express.Router();

const users = [];

// Check whether username already exists
const isValid = (username) => {
  return users.some((user) => user.username === username);
};

// Check username and password
const authenticatedUser = (username, password) => {
  return users.some(
    (user) =>
      user.username === username &&
      user.password === password
  );
};

// Register a new user
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  if (isValid(username)) {
    return res.status(409).json({
      message: "Username already exists",
    });
  }

  users.push({
    username,
    password,
  });

  return res.status(201).json({
    message: "User successfully registered",
  });
});

// Login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }

  const accessToken = jwt.sign(
    { username },
    "access_secret",
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    message: "Login successful",
    accessToken,
  });
});

// Add or update review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const { username, review } = req.body;

  if (!username || !review) {
    return res.status(400).json({
      message: "Username and review are required",
    });
  }

  const book = Object.values(books).find(
    (book) => String(book.isbn) === String(isbn)
  );

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  book.reviews[username] = review;

  return res.status(200).json({
    message: "Review added/updated successfully",
    reviews: book.reviews,
  });
});

// Delete review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const { username } = req.body;

  const book = Object.values(books).find(
    (book) => String(book.isbn) === String(isbn)
  );

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  if (!username || !book.reviews[username]) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  delete book.reviews[username];

  return res.status(200).json({
    message: "Review deleted successfully",
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;