const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nanoid = require('nanoid');
const passport = require('passport');
const sendgrid = require('@sendgrid/mail');
const hogan = require('hogan.js');
const fs = require('fs');
const keys = require('../../config/keys');

sendgrid.setApiKey(keys.sendGridApi);

const validateRegistrationInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//import and compile restaurantWelcome email file
const RestaurantWelcomeTemplate = fs.readFileSync(
  'mails/restaurantWelcome.hjs',
  'utf-8'
);
const ResetRestaurantTemplate = fs.readFileSync(
  'mails/restaurantReset.hjs',
  'utf-8'
);
const compiledRestaurantWelcomeTemplate = hogan.compile(
  RestaurantWelcomeTemplate
);
const compiledRestaurantResetTemplate = hogan.compile(ResetRestaurantTemplate);

const Restaurant = require('../../models/Restaurant');

// @route GET api/restaurant/test
// @desc route to get restaurant test route
// @access PUBLIC
router.get('/test', (req, res) =>
  res.json({ msg: 'restaurant test route works' })
);

// @route POST api/restaurant/partners/register'
// @desc route to register restaurant
// @access PRIVATE
router.post('/partners/register', (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Restaurant.find({
    $or: [
      { email: req.body.email },
      { restaurantname: req.body.restaurantname }
    ]
  }).then(restaurant => {
    if (restaurant) {
      errors.email = "Email or restaurant's name already exists";
      return res.status(400).json(errors);
    } else {
      //generate random hash string
      //store hash in db
      let activationCode = nanoid(50);
      const newRestaurant = new Restaurant({
        restaurantname: req.body.restaurantname,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newRestaurant.password, salt, (err, hash) => {
          if (err) throw err;
          newRestaurant.password = hash;
          newRestaurant
            .save()
            .then(restaurant => {
              const msg = {
                to: restaurant.email,
                from: 'maggie@e-kitchen.com',
                subject: 'Welcome to E-Kitchen',
                html: compiledRestaurantWelcomeTemplate.render({
                  name: restaurant.name
                })
              };
              sendgrid.send(msg);
              return res.status(200).json(restaurant);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/restaurant/partners/login
// @desc route to login in restaurant and generate restaurant
// @access PUBLIC
router.post('/partners/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //save email and password in variables
  const email = req.body.email;
  const password = req.body.password;

  //Find restaurant by email
  Restaurant.findOne({
    email
  }).then(restaurant => {
    if (!restaurant) {
      errors.email = 'No account matched with email provided';
      return res.status(404).json(errors);
    }

    if (restaurant.passwordresetcode) {
      return res.status(403).json({
        error:
          'you requested a password reset. Please reset your password to continue'
      });
    }

    //Check if provided password matches saved password
    bcrypt.compare(password, restaurant.password).then(isMatch => {
      if (isMatch) {
        //create payload
        const payload = {
          id: restaurant.id,
          name: restaurant.name,
          email: restaurant.email
        };

        //sign jwt
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 604800
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.status(400).json({
          password: 'Password is incorrect'
        });
      }
    });
  });
});

// @route GET api/restaurants/partners/account/activationcode
// @desc route to change restaurant isactive state to true
// @access PUBLIC
router.get('/partners/account/activate/:activationcode', (req, res) => {
  const activationcode = req.params.activationcode;
  Restaurant.findOne({
    activationcode
  })
    .then(restaurant => {
      if (restaurant) {
        restaurant.isactive = true;
        restaurant.activationcode = '';
        restaurant.save();
        return res.status(200).json(restaurant);
      } else {
        return res.status(200).json({
          activation: 'Your account has been verified'
        });
      }
    })
    .catch(err => res.json(err));
});

// @route POST api/restaurants/partners/account/passwordreset
// @desc route for restaurants to request password reset code
// @access PUBLIC
router.post('/partners/account/passwordreset', (req, res) => {
  const email = req.body.email;
  Restaurant.findOne({ email })
    .then(restaurant => {
      if (!restaurant) {
        return res.status(404).json({
          error: 'No account matched with email provided'
        });
      } else {
        restaurant.passwordresetcode = nanoid(50);
        restaurant.isactive = false;
        restaurant.save().then(restaurant => {
          const msg = {
            to: restaurant.email,
            from: 'maggie@e-kitchen .com',
            subject: 'Password Reset Request',
            html: compiledRestaurantResetTemplate.render({
              name: restaurant.name,
              passwordresetcode: restaurant.passwordresetcode
            })
          };
          sendgrid.send(msg);
        });
        return res.status(200).json(restaurant);
      }
    })
    .catch(err => res.status(500).json(err));
});

router.post(
  '/partners/account/passwordreset/:passwordresetcode',
  (req, res) => {
    const passwordresetcode = req.params.passwordresetcode;
    const password = req.body.password;
    Restaurant.findOne({ passwordresetcode })
      .then(restaurant => {
        if (!restaurant) {
          return res
            .status(400)
            .json({ error: 'Oops! Something is not right' });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              restaurant.password = hash;
              restaurant.passwordresetcode = '';
              restaurant.isactive = true;
              restaurant.save();
              return res.status(200).json(restaurant);
            });
          });
        }
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route GET api/restaurant/current
// @desc route to get details of currently logged in restaurant
// @access PRIVATE
router.get(
  '/current',
  passport.authenticate('restaurants', { session: false }),
  (req, res) => {
    const errors = {};
    Restaurant.findById(req.user.id)
      .then(restaurant => {
        errors.userNotFound = 'restaurant Not found';
        if (!restaurant) {
          return res.status(404).json(errors);
        }
        res.json({
          id: req.user.id,
          name: req.user.name,
          email: req.user.email
        });
      })
      .catch(err => res.status(404).json(err));
  }
);
// @route DELETE api/restaurant
// @desc route to delete restaurant account
// @access PRIVATE
router.delete(
  '/',
  passport.authenticate('restaurants', {
    session: false
  }),
  (req, res) => {
    Restaurant.findByIdAndRemove({
      _id: req.user.id
    }).then(() =>
      res.json({
        success: true
      })
    );
  }
);

module.exports = router;
