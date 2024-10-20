const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
6;

/**
 * Routes related to authentication.
 * @module routes/auth
 */
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017/ScholarStationDB";

// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err.message);
    process.exit(1); // Optional: exit the process if connection fails
  });

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/courses", courseRoutes);

app.get("/", (res) => {
  res.send("Hello, I am Scholar Station API");
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`);
});
