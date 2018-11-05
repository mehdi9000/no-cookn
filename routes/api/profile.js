const express = require('express');
// const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

//TODO: create address input validation file

//Load Profile
const Profile = require('../../models/Profile');
//Load User
const User = require('../../models/User');

//Load profile validation
const ValidateProfileInput = require('../../validation/profile');
const ValidateAddressInput = require('../../validation/address');

// @route Get api/profile/test @desc Tests Profile route @access Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Profile Works'
  })
);

// @route Get api/profile @desc route the to get currently logged in user from
// users auth @access PRIVATE
router.get(
  '/',
  passport.authenticate('users', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({
      user: req.user.id
    })
      .populate('user', ['name', 'email'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('users', {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = ValidateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.phone) profileFields.phone = req.body.phone;
    if (req.body.location) profileFields.location = req.body.location;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

router.get(
  '/user/:user_id',
  passport.authenticate('users', {
    session: false
  }),
  (req, res) => {
    const errors = {};

    Profile.findOne({
      user: req.params.user_id
    })
      .populate('user', ['name', 'email'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err =>
        res.status(404).json({
          profile: 'There is no profile for this user'
        })
      );
  }
);

// @route GET api/profile/all
// @desc route to get all profiles
// @access PUBLIC
router.get('/all-profiles/', (req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.ProfileNotFound = 'No profiles found';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json(err));
});

// @route POST api/profile/experience
// @desc route to add new experience
// @access PRIVATE
router.post(
  '/address',
  passport.authenticate('users', { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateAddressInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        const newAddress = {
          address1: req.body.address1,
          address2: req.body.address2,
          state: req.body.state,
          area: req.body.area,
          default: req.body.default
        };
        //add experience to array on profile model
        profile.address.unshift(newAddress);
        //save the profile
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            console.log(err);
            return res.status(400).json({ error: 'Something went wrong.' });
          });
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json({
          error: 'Something went wrong. Try adding a phone number first.'
        });
      });
  }
);

// @route DELETE api/profile/address/:address_id
// @desc router to delete address from profile
// @access PRIVATE
router.delete(
  '/address/:address_id',
  passport.authenticate('users', {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        profile.address.remove({
          _id: req.params.address_id
        });
        profile
          .save()
          .then(profile => res.json(profile.address))
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  }
);

// @route DELETE api/profile
// @desc route to delete profile and user account
// @access PRIVATE
router.delete(
  '/',
  passport.authenticate('users', { session: false }),
  (req, res) => {
    Profile.findByIdAndRemove({ user: req.user.id }).then(profile => {
      User.findByIdAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);
module.exports = router;
