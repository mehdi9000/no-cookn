const express = require('express');
const cors = require('cors');
const router = express.Router();
router.use(cors());

const userRoute = require('./user.routes');
const profileRoute = require('./profile.routes');
const addressRoute = require('./address.routes');
const restaurantRoute = require('./restaurants.routes');

router.use(userRoute);
router.use(profileRoute);
router.use(addressRoute);
router.use(restaurantRoute);

router.get('/api', function(req, res, next) {
  res.status(200).json({ message: 'Shit Happens' });
});

module.exports = router;
