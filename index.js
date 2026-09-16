const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Import routers correctly
const generalRouter = require("./routes/general").general;
const authRouter = require("./routes/auth_users").authenticated;

// General book APIs
app.use("/api", generalRouter);

// Authentication and review APIs
app.use("/api", authRouter);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Express Book Review API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});