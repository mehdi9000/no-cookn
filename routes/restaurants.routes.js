const express = require('express');
const router = express.Router();
const RestaurantActions = require('../controllers/restaurant.controller.js');
const verifyToken = require('../middleware/auth').verifyToken;

router.post('/api/auth/partners/register', RestaurantActions.Register);
router.post('/api/auth/partners/login', RestaurantActions.Login);
router.get('/api/partners/restaurants/all', RestaurantActions.FetchAll);

router.get(
  '/api/auth/partners/restaurant/user',
  verifyToken,
  RestaurantActions.GetRestaurantUser
);

router.delete(
  '/api/auth/partners/account/delete',
  verifyToken,
  RestaurantActions.DeleteAccount
);

module.exports = router;
