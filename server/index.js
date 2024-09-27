const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose"); // Removed unnecessary curly braces
const cookieParser = require("cookie-parser");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const { run } = require("./api/STT-TC-AC");

const app = express();

// Database connection
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database is Connected"))
  .catch((err) => console.error("Database not connected", err)); // Corrected typo and added err parameter

// Cloudinary Setup
cloudinary.config({
  cloud_name: "dvcqnbkwb",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(express.json({ limit: "100mb" })); // Limit for incoming JSON payload
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

/*/ Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "../Client/dist")));

// Fallback to serving index.html for any route not handled by the API
app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../Client/dist/index.html"), // Update to "dist"
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});*/

// Routes
app.use("/", require("./routes/authRoutes"));

// Error handling middleware for any unhandled routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = process.env.PORT || 5000; // Default port if not provided in .env
app.listen(port, () => console.log(`Server is running on port ${port}`)); // Used backticks for string interpolation
