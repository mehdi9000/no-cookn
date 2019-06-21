const express = require('express');
const cors = require('cors');
const router = express.Router();
router.use(cors());
const verifyToken = require('../middleware/auth').verifyToken;

const userRoute = require('./user.routes');


router.use(userRoute);

router.get('/api', function(req, res, next) {
  res.status(200).json({ message: 'Shit Happens' });
});

module.exports = router;