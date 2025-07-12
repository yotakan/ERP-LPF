const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({
    message: 'This is a protected dashboard',
    user: req.user
  });
});

module.exports = router;
