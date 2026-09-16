const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

// 1. Get all books
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);

    console.log("\n=== ALL BOOKS ===");
    console.log(response.data);
  } catch (error) {
    console.error("Error getting all books:", error.message);
  }
}

// 2. Get book by ISBN
async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(
      `${BASE_URL}/isbn/${isbn}`
    );

    console.log("\n=== BOOK BY ISBN ===");
    console.log(response.data);
  } catch (error) {
    console.error("Error getting book by ISBN:", error.message);
  }
}

// 3. Get books by author
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(
      `${BASE_URL}/author/${encodeURIComponent(author)}`
    );

    console.log("\n=== BOOKS BY AUTHOR ===");
    console.log(response.data);
  } catch (error) {
    console.error("Error getting books by author:", error.message);
  }
}

// 4. Get books by title
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(
      `${BASE_URL}/title/${encodeURIComponent(title)}`
    );

    console.log("\n=== BOOKS BY TITLE ===");
    console.log(response.data);
  } catch (error) {
    console.error("Error getting books by title:", error.message);
  }
};

// Export functions
module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};

// Test all Axios functions
getAllBooks();
getBookByISBN("9780140449136");
getBooksByAuthor("Homer");
getBooksByTitle("The Odyssey");