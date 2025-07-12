const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token missing' });

  const token = authHeader.split(' ')[1];
  console.log('🧪 VERIFY JWT_SECRET:', process.env.JWT_SECRET); // ✅ ใส่ตรงนี้
  console.log('📦 Incoming Token:', token); // ✅ ตรวจสอบ token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
