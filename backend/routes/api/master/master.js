const express = require('express');
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

const router = express.Router();

const WelcomeTemplate = fs.readFileSync('mails/welcome.hjs', 'utf-8');
const ResetTemplate = fs.readFileSync('mails/reset.hjs', 'utf-8');
const compiledWelcomeTemplate = hogan.compile(WelcomeTemplate);
const compiledResetTemplate = hogan.compile(ResetTemplate);

const Master = require('../../models/Master');
// @route Get api/posts/test @desc Tests Masters route @access Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Master Works'
  })
);

// @route POST api/Masters/register @desc @access PUBLIC
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Master.findOne({
    email: req.body.email
  }).then(master => {
    if (master) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      //generate random hash string
      //store hash in db
      let activationCode = nanoid(50);
      const newMaster = new Master({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        activationcode: activationCode
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newMaster.password, salt, (err, hash) => {
          if (err) throw err;
          newMaster.password = hash;
          newMaster
            .save()
            .then(master => {
              const msg = {
                to: master.email,
                from: 'maggie@e-kitchen.com',
                subject: 'Welcome to No-Cookn Master Monitor',
                html: compiledWelcomeTemplate.render({
                  name: master.name,
                  activationcode: master.activationcode
                })
              };
              sendgrid.send(msg);
              return res.status(201).json(master);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/Masters/login
// @desc route to login in Master and generate jwt
// @access PUBLIC
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //save email and password in variables
  const email = req.body.email;
  const password = req.body.password;

  //Find the Master by email
  Master.findOne({
    email
  }).then(master => {
    if (!master) {
      errors.email = 'No account matched with email provided';
      return res.status(404).json(errors);
    }

    if (master.passwordresetcode) {
      return res.status(403).json({
        error:
          'You requested a password reset. Please reset your password to continue.'
      });
    }

    if (master.isactive === true) {
      //Check if provided password matches saved password
      bcrypt.compare(password, master.password).then(isMatch => {
        if (isMatch) {
          //create payload
          const payload = {
            id: master.id,
            name: master.name,
            email: master.email
          };

          //sign jwt
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 3600
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
    } else {
      return res.status(400).json({
        error:
          'Your account is inactive. Please check your e-mail for our welcome mail to activate your account'
      });
    }
  });
});

// @route GET api/Masters/account/activationcode
// @desc route to change Master isactive state to true
// @access PUBLIC
router.get('/account/activate/:activationcode', (req, res) => {
  const activationcode = req.params.activationcode;
  Master.findOne({ activationcode })
    .then(master => {
      if (!master) {
        return res.status(404).json({ NotFound: 'Master not found' });
      }
      if (master) {
        master.isactive = true;
        master.activationcode = '';
        master.save();
        return res.status(200).json(master);
      } else {
        return res
          .status(200)
          .json({ activation: 'Your account has been verified' });
      }
    })
    .catch(err => res.json(err));
});

// @route POST api/Masters/account/passwordreset
// @desc route for Master to request password reset code
// @access PUBLIC
router.post('/account/passwordreset', (req, res) => {
  const email = req.body.email;
  Master.findOne({ email })
    .then(master => {
      if (!master) {
        return res
          .status(404)
          .json({ error: 'No account matched with email provided' });
      } else {
        master.passwordresetcode = nanoid(50);
        master.isactive = false;
        master.save().then(master => {
          const msg = {
            to: master.email,
            from: 'maggie@e-kitchen.com',
            subject: 'Password Reset Request',
            html: compiledResetTemplate.render({
              name: master.name,
              passwordresetcode: master.passwordresetcode
            })
          };
          sendgrid.send(msg);
        });
        return res.status(200).json(master);
      }
    })
    .catch(err => res.status(500).json(err));
});

router.post('/account/passwordreset/:passwordresetcode', (req, res) => {
  const passwordresetcode = req.params.passwordresetcode;
  const password = req.body.password;
  Master.findOne({ passwordresetcode })
    .then(master => {
      if (!master) {
        return res.status(400).json({ error: 'Oops! Something is not right' });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            master.password = hash;
            master.passwordresetcode = '';
            master.isactive = true;
            master.save();
            return res.status(200).json(master);
          });
        });
      }
    })
    .catch(err => res.status(500).json(err));
});

// @route GET api/Masters/current
// @desc route to get details of currently logged in Master
// @access PRIVATE
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Master.findById(req.master.id)
      .then(master => {
        errors.masterNotFound = 'Master Not found';
        if (!master) {
          return res.status(404).json(errors);
        }
        res.json({
          id: req.master.id,
          name: req.master.name,
          email: req.master.email
        });
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/Master
// @desc route to delete Master account
// @access PRIVATE
router.delete(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Master.findByIdAndRemove({
      _id: req.master.id
    }).then(() =>
      res.json({
        success: true
      })
    );
  }
);

module.exports = router;
