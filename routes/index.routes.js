const express = require('express');
const cors = require('cors');
const router = express.Router();
router.use(cors());

const userRoute = require('./user.routes');
const profileRoute = require('./profile.routes');
const addressRoute = require('./address.routes');
const restaurantRoute = require('./restaurants.routes');
const restaurantProfileRoute = require('./restautantProfile.routes');
const restaurantAddress = require('./restaurantAddress.routes');

router.use(userRoute);
router.use(profileRoute);
router.use(addressRoute);
router.use(restaurantRoute);
router.use(restaurantProfileRoute);
router.use(restaurantAddress);

router.get('/api', (req, res, next) => {
  res.status(200).json({ message: 'Shit Happens' });
});

module.exports = router;
