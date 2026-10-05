
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Temporary in-memory list (No MongoDB / Database needed!)
const registrations = [];

// API Route for Registration
app.post('/api/register', (req, res) => {
  registrations.push(req.body);
  console.log("New Registration Received:", req.body);
  res.status(201).json({ message: "Registration successful!" });
});

// API Route to Get Registrations
app.get('/api/registrations', (req, res) => {
  res.json(registrations);
});

// Serve frontend page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
