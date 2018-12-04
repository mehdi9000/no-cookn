const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nanoid = require("nanoid");
const passport = require("passport");
const sendgrid = require("@sendgrid/mail");
const hogan = require("hogan.js");
const fs = require("fs");
const keys = require("../../config/keys");


sendgrid.setApiKey(keys.sendGridApi);

const validateRegistrationInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const router = express.Router();

const WelcomeTemplate = fs.readFileSync("mails/welcome.hjs", "utf-8");
const ResetTemplate = fs.readFileSync("mails/reset.hjs", "utf-8");
const compiledWelcomeTemplate = hogan.compile(WelcomeTemplate);
const compiledResetTemplate = hogan.compile(ResetTemplate);

const User = require("../../models/User");
const RestaurantProfile = require("../../models/Restaurant-Profile");
const Restaurant = require("../../models/Restaurant");
// @route Get api/posts/test @desc Tests Users route @access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Users Works"
  })
);

// @route POST api/users/register @desc @access PUBLIC
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      //generate random hash string
      //store hash in db
      // let activationCode = nanoid(50);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        // activationcode: activationCode
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const msg = {
                to: user.email,
                from: "maggie@no-cookn.com",
                subject: "Welcome to no-cookn",
                html: compiledWelcomeTemplate.render({
                  name: user.name
                })
              };
              sendgrid.send(msg);
              return res.status(201).json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc route to login in user and generate users
// @access PUBLIC
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //save email and password in variables
  const email = req.body.email;
  const password = req.body.password;

  //Find the user by email
  User.findOne({
    email
  }).then(user => {
    if (!user) {
      errors.email = "No account matched with email provided";
      return res.status(404).json(errors);
    }

    if (user.suspended == true) {
      return res.status(300).json({
        error:
          "Your account has been suspended temporarily. Contact the admin to recover your account"
      });
    }

    if (user.passwordresetcode) {
      return res.status(403).json({
        error:
          "You requested a password reset. Please reset your password to continue."
      });
    }

    if (user) {
      //Check if provided password matches saved password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //create payload
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email
          };

          //sign users
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 604800
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({
            password: "Password is incorrect"
          });
        }
      });
    }
  });
});

// @route GET api/users/account/activationcode
// @desc route to change user isactive state to true
// @access PUBLIC
router.get("/account/activate/:activationcode", (req, res) => {
  const activationcode = req.params.activationcode;
  User.findOne({ activationcode })
    .then(user => {
      if (!user) {
        return res.status(404).json({ errors: "User not found" });
      }
      if (user) {
        user.isactive = true;
        user.activationcode = "";
        user.save();
        return res.status(200).json(user);
      } else {
        return res
          .status(200)
          .json({ activation: "Your account has been verified" });
      }
    })
    .catch(err => res.json(err));
});

// @route POST api/users/account/passwordreset
// @desc route for user to request password reset code
// @access PUBLIC
router.post("/account/passwordreset", (req, res) => {
  const email = req.body.email;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ error: "No account matched with email provided" });
      } else {
        user.passwordresetcode = nanoid(50);
        user.isactive = false;
        user.save().then(user => {
          const msg = {
            to: user.email,
            from: "maggie@no-cookn.com",
            subject: "Password Reset Request",
            html: compiledResetTemplate.render({
              name: user.name,
              passwordresetcode: user.passwordresetcode
            })
          };
          sendgrid.send(msg);
        });
        return res.status(200).json(user);
      }
    })
    .catch(err => res.status(500).json(err));
});

router.post("/account/passwordreset/:passwordresetcode", (req, res) => {
  const passwordresetcode = req.params.passwordresetcode;
  const password = req.body.password;
  User.findOne({ passwordresetcode })
    .then(user => {
      if (!user) {
        return res.status(400).json({ error: "Oops! Something is not right" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.passwordresetcode = "";
            user.isactive = true;
            user.save();
            return res.status(200).json(user);
          });
        });
      }
    })
    .catch(err => res.status(500).json(err));
});

// @route GET api/users/current
// @desc route to get details of currently logged in user
// @access PRIVATE
router.get(
  "/current",
  passport.authenticate("users", { session: false }),
  (req, res) => {
    const errors = {};
    User.findById(req.user.id)
      .then(user => {
        errors.userNotFound = "User Not found";
        if (!user) {
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

// @route DELETE api/user
// @desc route to delete user account
// @access PRIVATE
router.delete(
  "/",
  passport.authenticate("users", {
    session: false
  }),
  (req, res) => {
    User.findByIdAndRemove({
      _id: req.user.id
    }).then(() =>
      res.json({
        success: true
      })
    );
  }
);

//search location
router.get("/search", (req, res) => {
  RestaurantProfile.findOne({
    deliveryareas: [req.body.location]
  }).then(restaurantProfile => {
    if (restaurantProfile) {
      return res.status(200).json(restaurantProfile);
    } else {
      return res.status(404).json("No restaurant delivers to your location");
    }
  });
});

module.exports = router;
