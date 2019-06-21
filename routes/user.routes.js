const express = require('express');
const router = express.Router();
const userOps = require('../controllers/user.controller.js');
const verifyToken = require('../middleware/auth').verifyToken;

router.post('/api/auth/register', userOps.Register);
router.post('/api/auth/login', userOps.Login);

module.exports = router;
