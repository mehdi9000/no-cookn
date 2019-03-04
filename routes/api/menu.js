const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const RestaurantProfile = require('../../models/Restaurant-Profile');
const Restaurant = require('../../models/Restaurant');
const Menu = require('../../models/Menu');

const ValidateMenuInput = require('../../validation/menu');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './menuImages');
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
const upload = multer({ storage });

//test route
router.get('/test', (req, res) => {
  res.json({ msg: 'Menu Works Works' });
});

// @route   POST api/restaurant/partners/menu
// @desc    route to add food menu to a restaurant profile
// @access  PRIVATE
router.post(
  '/',
  passport.authenticate('restaurants', { session: false }),
  upload.single('picture'),
  (req, res) => {
    const { errors, isValid } = ValidateMenuInput(req.body);
    //check validation
    if (!isValid) {
      // Return error with satus 400
      return res.status(400).json(errors);
    }
    RestaurantProfile.findOne({
      restaurant: req.user.id
    })
      .then(restaurantProfile => {
        const newMenu = new Menu({
          menuname: req.body.menuname,
          category: req.body.category,
          description: req.body.description,
          price: req.body.price,
          deliverytime: req.body.deliverytime,
          picture: req.file.path,
          restaurant: req.user.id,
          restaurantprofile: restaurantProfile.id
        });
        newMenu.extras = {};
        if (req.body.extrasame)
          newMenu.extras.extrasname = req.body.extrasname
            .split(',')
            .map(function(item) {
              return item.trim();
            });
        if (req.body.extrasprice)
          newMenu.extras.extrasprice = req.body.extrasprice
            .split(',')
            .map(function(item) {
              return item.trim();
            });

        newMenu.save().then(menu => {
          res.json(menu);
        });
      })
      .catch(err => console.log(err));
  }
);

router.get(
  '/all-menu',
  passport.authenticate('restaurants', { session: false }),
  (req, res) => {
    // const errors = {};
    Menu.find({ restaurant: req.user.id })
      .sort({ creationdate: -1 })
      .then(menu => {
        if (menu) {
          res.json(menu);
        } else res.json({ msg: "You haven't created any menu items" });
      })
      .catch(err => {
        console.log(err);
        res.json({ msg: 'Something went wrong.' });
      });
  }
);

router.get(
  '/:id',
  passport.authenticate('restaurants', { session: false }),
  (req, res) => {
    Menu.find({ restaurant: req.user.id })
      .then(restaurant => {
        Menu.findById(req.params.id)
          .then(menu => {
            if (menu) {
              res.json(menu);
            } else res.json({ msg: 'Requested resource not found' });
          })
          .catch(err => {
            console.log(err);
            res.json({ msg: 'menu not found.' });
          });
      })
      .catch(err => {
        console.log(err);
        res.json({ msg: 'User not found' });
      });
  }
);

module.exports = router;
