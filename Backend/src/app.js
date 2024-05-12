const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongodbURI = process.env.MONGODB_URI;

const userRoutes = require("./routes/userRoutes");


const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);


// MongoDB connection
mongoose
  .connect(mongodbURI)
  .then(() => console.log("MongoDB connected Successfully"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;