const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const compression = require("compression");
const helmet = require("helmet"); // Import Helmet

const app = express();

// Middleware to force HTTPS
app.use((req, res, next) => {
  if (req.header("x-forwarded-proto") !== "https") {
    return res.redirect(`https://${req.header("host")}${req.url}`);
  }
  next();
});

// Enable compression for better performance
app.use(compression());

// Apply security headers using Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://apis.google.com"], // Customize script sources
        styleSrc: ["'self'", "https://fonts.googleapis.com"], // Customize style sources
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"], // Example for images
        audSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      },
    },
    referrerPolicy: { policy: "no-referrer" }, // Referrer-Policy
    frameguard: { action: "deny" }, // X-Frame-Options to prevent clickjacking
    hsts: { maxAge: 63072000, includeSubDomains: true }, // Strict-Transport-Security (HSTS)
    xssFilter: true, // X-XSS-Protection
    noSniff: true, // X-Content-Type-Options to prevent MIME-sniffing
    permissionsPolicy: {
      features: {
        geolocation: ["'none'"], // Example Permissions-Policy rule
        camera: ["'none'"],
        microphone: ["'none'"],
      },
    },
  })
);

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

// Middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Register API routes
app.use("/api", require("./routes/authRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Serve static files from the client build (React Vite build)
app.use(express.static(path.join(__dirname, "../Client/dist")));

// Catch-all route to serve the React app (if no API route matches)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/dist/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Start the server on the specified port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
