const express = require('express');
const router = express.Router();
const RestaurantProfileActions = require('../controllers/restaurantProfile.controller.js');
const verifyToken = require('../middleware/auth').verifyToken;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime().toString() +
        '-' +
        file.fieldname +
        path.extname(file.originalname)
    );
  }
});
const upload = multer({ storage: storage });

router.post(
  '/api/restautant/profile/create',
  verifyToken,
  upload.single('logo'),
  RestaurantProfileActions.Create
);

router.get(
  '/api/restaurant/profile/fetch/:id',
  verifyToken,
  RestaurantProfileActions.FetchProfile
);

module.exports = router;
