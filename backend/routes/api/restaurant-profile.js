const express = require('express');
// const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

//TODO: create address input validation file

//Load Profile
const restaurantProfile = require('../../models/Restaurant-Profile');
//Load Restaurant
const Restaurant = require('../../models/Restaurant');

//Load User
const User = require('../../models/User');

//Load profile validation
const ValidateProfileInput = require('../../validation/profile');
const ValidateAddressInput = require('../../validation/address');

//restaurant Like and unlike features
// @route   POST api/restaurant/like/:id
// @desc    Like restaurant
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    restaurantProfile
      .findOne({
        user: req.user.id
      })
      .then(profile => {
        Restaurant.findById(req.params.id)
          .then(restaurant => {
            if (
              restaurant.likes.filter(
                like => like.user.toString() === req.user.id
              ).length > 0
            ) {
              return res.status(400).json({
                alreadyliked: 'You have already liked this restaurant'
              });
            }
            // Add user id to likes array
            restaurant.likes.unshift({
              user: req.user.id
            });

            restaurant.save().then(restaurant => res.json(restaurant));
          })
          .catch(err =>
            res.status(404).json({
              notFound: 'No restaurant found'
            })
          );
      });
  }
);

// @route   POST api/restaurant/unlike/:id
// @desc    Unlike restaurant
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Restaurant.findById(req.params.id)
        .then(restaurant => {
          if (
            restaurant.likes.filter(
              like => like.user.toString() === req.user.id
            ).length === 0
          ) {
            return res.status(400).json({
              notliked: 'You have not yet liked this restaurant'
            });
          }
          // Get remove index
          const removeIndex = restaurant.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          restaurant.likes.splice(removeIndex, 1);

          // Save
          restaurant.save().then(post => res.json(restaurant));
        })
        .catch(err =>
          res.status(404).json({
            restaurantnotfound: 'No restaurant found'
          })
        );
    });
  }
);
