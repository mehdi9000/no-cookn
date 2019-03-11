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
        // newMenu.extras = {};
        if (req.body.extrasname)
          newMenu.extrasname = req.body.extrasname
            .split(',')
            .map(function(item) {
              return item.trim();
            });
        if (req.body.extrasprice)
          newMenu.extrasprice = req.body.extrasprice
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

router.post(
  '/update/:id',
  passport.authenticate('restaurants', { session: false }),
  upload.single('picture'),
  (req, res) => {
    const { errors, isValid } = ValidateMenuInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const err = { menu: 'Menu or restaurant not found!' };
    RestaurantProfile.findOne({ restaurant: req.user.id }).then(
      restaurantProfile => {
        if (restaurantProfile) {
          // if (typeof req.body.picture === 'string')
          //   updatedMenu.picture = req.body.picture;
          // else if (req.file.picture) updatedMenu.picture = req.file.path;
          // Update menu
          const updatedMenu = {
            menuname: req.body.menuname,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            picture: req.file.path,
            deliverytime: req.body.deliverytime,
            restaurant: req.user.id,
            restaurantprofile: restaurantProfile.id
          };

          if (req.body.extrasname)
            updatedMenu.extrasname = req.body.extrasname
              .split(',')
              .map(function(item) {
                return item.trim();
              });
          if (req.body.extrasprice)
            updatedMenu.extrasprice = req.body.extrasprice
              .split(',')
              .map(function(item) {
                return item.trim();
              });
          Menu.updateOne(
            { _id: req.params.id },
            {
              $set: {
                menuname: updatedMenu.menuname,
                category: updatedMenu.category,
                description: updatedMenu.description,
                price: updatedMenu.price,
                deliverytime: updatedMenu.deliverytime,
                extrasname: updatedMenu.extrasname,
                extrasprice: updatedMenu.extrasprice,
                picture: updatedMenu.picture,
                restaurant: req.user.id,
                restaurantprofile: restaurantProfile.id
              }
            },
            { new: true }
          ).then(menu => {
            console.log(menu);
            return res.json(menu);
          });
        } else {
          // return 404 error menu not  found
          return res.status(404).json(err.menu);
        }
      }
    );
  }
);

// @route Delete api/restaurants/menu/:menu_id
// @desc router to delete menu from restaurant's profile
// @access PRIVATE
router.delete(
  '/partners/menu/:menu_id',
  passport.authenticate('restaurants', {
    session: false
  }),
  (req, res) => {
    RestaurantProfile.findOne({
      restaurant: req.user.id
    })
      .then(restaurantProfile => {
        restaurantProfile.menu.remove({
          _id: req.params.menu_id
        });
        restaurantProfile
          .save()
          .then(restaurantProfile => res.json(restaurantProfile.menu))
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  }
);

//not tested

module.exports = router;
