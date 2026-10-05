const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

/* ================= EVENT DETAILS ================= */

const EVENT_DETAILS = {
    "Paper Presentation": {
        venue: "Seminar Hall A",
        time: "9:00 AM",
        category: "Technical"
    },
    "Code Sprint": {
        venue: "Lab 2",
        time: "10:30 AM",
        category: "Technical"
    },
    "Tech Quiz": {
        venue: "Auditorium",
        time: "12:00 PM",
        category: "Technical"
    },
    "Debugging Duel": {
        venue: "Lab 3",
        time: "2:00 PM",
        category: "Technical"
    },
    "Robo Race": {
        venue: "Innovation Lab",
        time: "9:00 AM",
        category: "Technical"
    },
    "UI/UX Challenge": {
        venue: "Design Studio",
        time: "10:30 AM",
        category: "Technical"
    },
    "AI Idea Pitch": {
        venue: "Seminar Hall B",
        time: "12:00 PM",
        category: "Technical"
    },
    "Circuit Clash": {
        venue: "Electronics Lab",
        time: "2:00 PM",
        category: "Technical"
    },
    "Web Arena": {
        venue: "Web Lab",
        time: "12:00 PM",
        category: "Technical"
    },
    "Project Expo": {
        venue: "Main Block",
        time: "2:00 PM",
        category: "Technical"
    },

    "Treasure Hunt": {
   
