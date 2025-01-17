const express = require('express');
const { Client } = require("@googlemaps/google-maps-services-js");

const app = express();
const PORT = 3000;

const client = new Client({});

let teams = [];

app.use(express.json());

app.get('/', (req, res) => {
    res.send('مرحبًا بك في تطبيق Bike Riders App!');
});

app.post('/add_team', (req, res) => {
    const { name, location, host_available, contact } = req.body;
    if (!name || !location || !contact) {
        return res.status(400).json({ message: "جميع الحقول مطلوبة!" });
    }

    const team = { id: teams.length + 1, name, location, host_available, contact };
    teams.push(team);
    res.status(201).json({ message: "تم تسجيل الفريق بنجاح!", team });
});

app.get('/teams', (req, res) => {
    res.json({ teams });
});

app.get('/location/:address', async (req, res) => {
    const { address } = req.params;
    try {
        const response = await client.geocode({
            params: { address, key: 'YOUR_GOOGLE_MAPS_API_KEY' }
        });
        res.json(response.data.results[0].geometry.location);
    } catch (error) {
        res.status(500).json({ message: "خطأ في جلب الموقع", error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
