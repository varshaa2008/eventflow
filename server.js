app.post('/api/register', (req, res) => {
    const { fullName, regNo, email, dept, year, eventName } = req.body;

    if (!fullName || !regNo || !email || !dept || !year || !eventName) {
        return res.status(400).json({
            success: false,
            message: 'All registration fields are required.'
        });
    }

    const eventInfo = EVENT_DETAILS[eventName];

    if (!eventInfo) {
        return res.status(400).json({
            success: false,
            message: 'Selected event not found in database.'
        });
    }

    const exists = registrations.some(
        r => r.regNo.toLowerCase() === regNo.toLowerCase() &&
             r.eventName === eventName
    );

    if (exists) {
        return res.status(409).json({
            success: false,
            message: `Register number ${regNo} is already registered for ${eventName}.`
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
        message: 'Registration registered successfully!',
        data: record
    });
});
