const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.login = (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM erp_system.user WHERE username = ? AND is_active = 1";

  db.query(sql, [username], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "ไม่พบผู้ใช้งาน" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });
      }

      const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
        department_id: user.department_id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });

      res.json({
        message: "Login success",
        token,
        user: payload,
      });
    });
  });
};
