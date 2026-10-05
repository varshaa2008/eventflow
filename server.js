const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.static('.')); // Serves your static files (index.html)

// MongoDB Connection
const mongoURI = const mongoURI = "mongodb+srv://varshadhaneshkumar3_db_user:BTAckL1n7ehQZ9frY@cluster0.evt5mih.mongodb.net/?appName=Cluster0";
if (mongoURI) {
  mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected!"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));
}

// 1. Define a Schema for Registration
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  type: String, // "Technical" or "Non-Technical"
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', registrationSchema);

// 2. API to Save Data (POST)
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, type } = req.body;
    const newRegistration = new Registration({ name, email, type });
    await newRegistration.save();
    res.status(201).json({ message: "Registered successfully!", data: newRegistration });
  } catch (error) {
    res.status(500).json({ error: "Failed to save registration" });
  }
});

// 3. API to Fetch All Data (GET)
app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
