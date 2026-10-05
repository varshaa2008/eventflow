
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using your Render Environment Variable
const mongoURI = process.env.MONGO_URI;

if (mongoURI) {
  mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));
} else {
  console.log("⚠️ MONGO_URI is missing from Environment Variables!");
}

// Simple test route to verify server works
app.get('/', (req, res) => {
  res.send("Server is running and connected to database!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));