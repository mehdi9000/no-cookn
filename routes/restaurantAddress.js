const express = require('express');
const router = express.Router();
const addressActions = require('../controllers/restaurantAddress.controller');
const verifyToken = require('../middleware/auth').verifyToken;

router.post(
  '/api/restaurant/profile/address',
  verifyToken,
  addressActions.NewAddress
);
router.get(
  '/api/restaurant/profile/address-book',
  verifyToken,
  addressActions.FetchAddresses
);
router.get(
  '/api/restaurant/profile/address/:id',
  verifyToken,
  addressActions.GetAddressByID
);

router.put(
  '/api/restaurant/profile/address/update/:id',
  verifyToken,
  addressActions.UpdateAddress
);

router.delete(
  '/api/restaurant/profile/address/delete/:id',
  verifyToken,
  addressActions.DeleteAddress
);

module.exports = router;
