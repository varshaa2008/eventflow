const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

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
        venue: "Open Ground",
        time: "2:00 PM",
        category: "Non-Technical"
    },
    "Connection": {
        venue: "Block B",
        time: "10:30 AM",
        category: "Non-Technical"
    },
    "Photography Contest": {
        venue: "Media Room",
        time: "12:00 PM",
        category: "Non-Technical"
    },
    "Ad Zap": {
        venue: "Seminar Hall C",
        time: "2:00 PM",
        category: "Non-Technical"
    },
    "Meme War": {
        venue: "Block A",
        time: "10:30 AM",
        category: "Non-Technical"
    },
    "Best Manager": {
        venue: "Conference Hall",
        time: "9:00 AM",
        category: "Non-Technical"
    },
    "Dumb Charades": {
        venue: "Open Hall",
        time: "12:00 PM",
        category: "Non-Technical"
    },
    "Fun Quiz": {
        venue: "Auditorium",
        time: "10:30 AM",
        category: "Non-Technical"
    },
    "Minute to Win It": {
        venue: "Open Ground",
        time: "2:00 PM",
        category: "Non-Technical"
    }
};


// Temporary registration storage
const registrations = [];


// ===============================
// REGISTER PARTICIPANT
// ===============================

app.post("/api/register", (req, res) => {

    const {
        fullName,
        regNo,
        email,
        dept,
        year,
        eventName
    } = req.body;


    if (
        !fullName ||
        !regNo ||
        !email ||
        !dept ||
        !year ||
        !eventName
    ) {
        return res.status(400).json({
            success: false,
            message: "All registration fields are required."
        });
    }


    const event = EVENT_DETAILS[eventName];


    if (!event) {
        return res.status(400).json({
            success: false,
            message: "Selected event not found."
        });
    }


    // Duplicate registration check
    const alreadyRegistered = registrations.some(
        registration =>
            registration.regNo.toLowerCase() === regNo.toLowerCase() &&
            registration.eventName === eventName
    );


    if (alreadyRegistered) {
        return res.status(409).json({
            success: false,
            message:
                `Register number ${regNo} is already registered for ${eventName}.`
        });
    }


    const registration = {

        id: registrations.length + 1,

        fullName: fullName,

        regNo: regNo,

        email: email,

        dept: dept,

        year: year,

        eventName: eventName,

        category: event.category,

        venue: event.venue,

        time: event.time,

        registeredAt: new Date().toISOString()
    };


    registrations.push(registration);


    res.status(201).json({

        success: true,

        message: "Registration successful!",

        data: registration
    });

});


// ===============================
// STATISTICS
// ===============================

app.get("/api/stats", (req, res) => {

    const baseTotal = 4650;

    const baseTechnical = 2000;

    const baseNonTechnical = 2650;


    const newTechnical = registrations.filter(
        r => r.category === "Technical"
    ).length;


    const newNonTechnical = registrations.filter(
        r => r.category === "Non-Technical"
    ).length;


    res.json({

        success: true,

        stats: {

            total: baseTotal + registrations.length,

            technical: baseTechnical + newTechnical,

            nonTechnical: baseNonTechnical + newNonTechnical

        }

    });

});


// ===============================
// VIEW ALL REGISTRATIONS
// ===============================

app.get("/api/registrations", (req, res) => {

    res.json({

        success: true,

        count: registrations.length,

        data: registrations

    });

});


// ===============================
// FRONTEND
// ===============================

app.get("/{*splat}", (req, res) => {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

    console.log(
        `EventFlow running on http://localhost:${PORT}`
    );

});