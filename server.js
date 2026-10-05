const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const EVENT_DETAILS = {
    "Paper Presentation": { venue: "Seminar Hall A", time: "9:00 AM", category: "Technical" },
    "Code Sprint": { venue: "Lab 2", time: "10:30 AM", category: "Technical" },
    "Tech Quiz": { venue: "Auditorium", time: "12:00 PM", category: "Technical" },
    "Debugging Duel": { venue: "Lab 3", time: "2:00 PM", category: "Technical" },
    "Robo Race": { venue: "Innovation Lab", time: "9:00 AM", category: "Technical" },
    "UI/UX Challenge": { venue: "Design Studio", time: "10:30 AM", category: "Technical" },
    "AI Idea Pitch": { venue: "Seminar Hall B", time: "12:00 PM", category: "Technical" },
    "Circuit Clash": { venue: "Electronics Lab", time: "2:00 PM", category: "Technical" },
    "Web Arena": { venue: "Web Lab", time: "12:00 PM", category: "Technical" },
    "Project Expo": { venue: "Main Block", time: "2:00 PM", category: "Technical" },

    "Treasure Hunt": { venue: "Open Ground", time: "2:00 PM", category: "Non-Technical" },
    "Connection": { venue: "Block B", time: "10:30 AM", category: "Non-Technical" },
    "Photography Contest": { venue: "Media Room", time: "12:00 PM", category: "Non-Technical" },
    "Ad Zap": { venue: "Seminar Hall C", time: "2:00 PM", category: "Non-Technical" },
    "Meme War": { venue: "Block A", time: "10:30 AM", category: "Non-Technical" },
    "Best Manager": { venue: "Conference Hall", time: "9:00 AM", category: "Non-Technical" },
    "Dumb Charades": { venue: "Open Hall", time: "12:00 PM", category: "Non-Technical" },
    "Fun Quiz": { venue: "Auditorium", time: "10:30 AM", category: "Non-Technical" },
    "Minute to Win It": { venue: "Open Ground", time: "2:00 PM", category: "Non-Technical" }
};

const registrations = [];

/* REGISTER */
app.post("/api/register", (req, res) => {

    const { fullName, regNo, email, dept, year, eventName } = req.body;

    if (!fullName || !regNo || !email || !dept || !year || !eventName) {
        return res.status(400).json({
            success: false,
            message: "All registration fields are required."
        });
    }

    const eventInfo = EVENT_DETAILS[eventName];

    if (!eventInfo) {
        return res.status(400).json({
            success: false,
            message: "Selected event not found."
        });
    }

    const exists = registrations.some(
        r =>
            r.regNo.toLowerCase() === regNo.toLowerCase() &&
            r.eventName === eventName
    );

    if (exists) {
        return res.status(409).json({
            success: false,
            message: "This register number is already registered for this event."
        });
    }

    const record = {
        id: registrations.length + 1,
        fullName,
        regNo,
        email,
        dept,
        year,
        eventName,
        category: eventInfo.category,
        venue: eventInfo.venue,
        time: eventInfo.time,
        registeredAt: new Date().toISOString()
    };

    registrations.push(record);

    return res.status(201).json({
        success: true,
        message: "Registration successful!",
        data: record
    });
});

/* STATS */
app.get("/api/stats", (req, res) => {

    const baseTotal = 4650;
    const baseTech = 2000;
    const baseNonTech = 2650;

    const newTech = registrations.filter(
        r => r.category === "Technical"
    ).length;

    const newNonTech = registrations.filter(
        r => r.category === "Non-Technical"
    ).length;

    res.json({
        success: true,
        stats: {
            total: baseTotal + registrations.length,
            technical: baseTech + newTech,
            nonTechnical: baseNonTech + newNonTech
        }
    });
});

/* ALL REGISTRATIONS */
app.get("/api/registrations", (req, res) => {

    res.json({
        success: true,
        count: registrations.length,
        data: registrations
    });
});

/* HOME PAGE */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

/* START SERVER */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
