const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
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
  .catch((err) => console.error("Database not connected", err));

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
app.use(cors()); // Enable CORS globally

// Routes
app.use("/api", require("./routes/authRoutes")); // Ensure API routes are registered first

// Serve static files (for the frontend)
app.use(express.static(path.join(__dirname, "../Client/dist")));

// Catch-all for serving the frontend app (fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/dist/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
