const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose"); // Removed unnecessary curly braces
const gridfsStream = require("gridfs-stream");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const cookieParser = require("cookie-parser");

const app = express();

// Database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database is Connected"))
  .catch((err) => console.error("Database not connected", err)); // Corrected typo and added err parameter

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads", // Name of the bucket
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Middleware
app.use(express.json({ limit: "10mb" })); // Limit for incoming JSON payload
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", require("./routes/authRoutes"));

// Error handling middleware for any unhandled routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = process.env.PORT || 5000; // Default port if not provided in .env
app.listen(port, () => console.log(`Server is running on port ${port}`)); // Used backticks for string interpolation
