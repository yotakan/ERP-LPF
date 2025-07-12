const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected'); // ✅ เพิ่มบรรทัดนี้

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes); // ✅ ใช้งาน route ที่ต้อง login

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
