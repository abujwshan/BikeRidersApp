const express = require('express');

const app = express();
const PORT = 3000;

// قاعدة بيانات مؤقتة للفرق
let teams = [];

app.use(express.json());

// نقطة البداية: رسالة ترحيبية
app.get('/', (req, res) => {
    res.send('مرحبًا بك في تطبيق Bike Riders App!');
});

// تسجيل فريق جديد
app.post('/add_team', (req, res) => {
    const { name, location, host_available, contact } = req.body;

    if (!name || !location || !contact) {
        return res.status(400).json({ message: "جميع الحقول مطلوبة!" });
    }

    const team = {
        id: teams.length + 1,
        name,
        location,
        host_available,
        contact
    };

    teams.push(team); // إضافة الفريق إلى القائمة المؤقتة
    res.status(201).json({ message: "تم تسجيل الفريق بنجاح!", team });
});

// عرض قائمة الفرق
app.get('/teams', (req, res) => {
    res.json({ teams });
});

// ميزة الموقع مؤقتًا
app.get('/location/:address', (req, res) => {
    res.json({ message: "ميزة الموقع معطلة حاليًا. سيتم إضافتها لاحقًا." });
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
