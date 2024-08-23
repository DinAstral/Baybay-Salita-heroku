const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose"); // Remove curly braces around mongoose
const cookieParser = require("cookie-parser");

const app = express();

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database is Connected"))
  .catch((err) => console.log("Database not connected", err)); // Fix typo and include err parameter

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`)); // Use backticks for string interpolation
