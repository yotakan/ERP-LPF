const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.register = async (req, res) => {
  const { username, password, full_name, email } = req.body;

  if (!username || !password || !full_name || !email) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    const checkSql = "SELECT * FROM user WHERE username = ?";
    db.query(checkSql, [username], async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (results.length > 0)
        return res.status(409).json({ message: "มี username นี้ในระบบแล้ว" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql = `
        INSERT INTO user 
        (username, password_hash, full_name, email, role, department_id, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, 'USER', NULL, 1, NOW(), NOW())
      `;

      db.query(
        insertSql,
        [username, hashedPassword, full_name, email],
        (err, result) => {
          if (err) return res.status(500).json({ message: "Insert failed" });
          res.status(201).json({
            message: "สมัครสมาชิกสำเร็จ",
            user_id: result.insertId,
          });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
