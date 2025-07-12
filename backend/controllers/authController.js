const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM user WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database Error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];

    // bcrypt.compare ต้องใช้ callback หรือแยกออก async/await แบบชัดเจน
    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error comparing passwords' });
      if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

      const payload = {
        id: user.id,
        role: user.role,
        department_id: user.department_id,
        username: user.username,
      };

      console.log('🧠 USER PAYLOAD:', payload);

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

      res.json({
        message: 'Login success',
        token,
        user: payload,
      });
    });
  });
};
