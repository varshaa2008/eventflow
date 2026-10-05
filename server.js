const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());

// Serve static files (index.html, CSS, frontend JS)
app.use(express.static(__dirname));

// MongoDB Connection
const mongoURI = "mongodb+srv://varshadhaneshkumar3_db_user:BTAckL1n7ehQZ9frY@cluster0.evt5mih.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Schema for Registration
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  type: String
});

const Registration = mongoose.model('Registration', registrationSchema);

// API Route: Register User
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, type } = req.body;
    const newRegistration = new Registration({ name, email, type });
    await newRegistration.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// API Route: Get All Registrations
app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
});

// Serve index.html as homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
