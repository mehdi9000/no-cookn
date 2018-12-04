const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nanoid = require('nanoid');
const passport = require('passport');
const sendgrid = require('@sendgrid/mail');
const hogan = require('hogan.js');
const fs = require('fs');
const keys = require('../../../config/keys');

sendgrid.setApiKey(keys.sendGridApi);

const validateRegistrationInput = require('../../../validation/register');
const validateLoginInput = require('../../../validation/login');

const router = express.Router();

const WelcomeTemplate = fs.readFileSync('mails/welcome.hjs', 'utf-8');
const ResetTemplate = fs.readFileSync('mails/reset.hjs', 'utf-8');
const compiledWelcomeTemplate = hogan.compile(WelcomeTemplate);
const compiledResetTemplate = hogan.compile(ResetTemplate);

const Admin = require('../../../models/Admin');
// @route Get api/posts/test @desc Tests admins route @access Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'admin Works'
  })
);

// @route POST api/admins/register @desc @access PUBLIC
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Admin.findOne({
    email: req.body.email
  }).then(admin => {
    if (admin) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      //generate random hash string
      //store hash in db
      let activationCode = nanoid(50);
      const newadmin = new admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        activationcode: activationCode
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newadmin.password, salt, (err, hash) => {
          if (err) throw err;
          newadmin.password = hash;
          newadmin
            .save()
            .then(admin => {
              const msg = {
                to: admin.email,
                from: 'maggie@e-kitchen.com',
                subject: 'Welcome to No-Cookn admin Monitor',
                html: compiledWelcomeTemplate.render({
                  name: admin.name,
                  activationcode: admin.activationcode
                })
              };
              sendgrid.send(msg);
              return res.status(201).json(admin);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/admins/login
// @desc route to login in admin and generate jwt
// @access PUBLIC
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //save email and password in variables
  const email = req.body.email;
  const password = req.body.password;

  //Find the admin by email
  Admin.findOne({
    email
  }).then(admin => {
    if (!admin) {
      errors.email = 'No account matched with email provided';
      return res.status(404).json(errors);
    }

    if (admin.passwordresetcode) {
      return res.status(403).json({
        error:
          'You requested a password reset. Please reset your password to continue.'
      });
    }

    if (admin.isactive === true) {
      //Check if provided password matches saved password
      bcrypt.compare(password, admin.password).then(isMatch => {
        if (isMatch) {
          //create payload
          const payload = {
            id: admin.id,
            name: admin.name,
            email: admin.email
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

// @route GET api/admins/account/activationcode
// @desc route to change admin isactive state to true
// @access PUBLIC
router.get('/account/activate/:activationcode', (req, res) => {
  const activationcode = req.params.activationcode;
  Admin.findOne({ activationcode })
    .then(admin => {
      if (!admin) {
        return res.status(404).json({ NotFound: 'admin not found' });
      }
      if (admin) {
        admin.isactive = true;
        admin.activationcode = '';
        admin.save();
        return res.status(200).json(admin);
      } else {
        return res
          .status(200)
          .json({ activation: 'Your account has been verified' });
      }
    })
    .catch(err => res.json(err));
});

// @route POST api/admins/account/passwordreset
// @desc route for admin to request password reset code
// @access PUBLIC
router.post('/account/passwordreset', (req, res) => {
  const email = req.body.email;
  Admin.findOne({ email })
    .then(admin => {
      if (!admin) {
        return res
          .status(404)
          .json({ error: 'No account matched with email provided' });
      } else {
        admin.passwordresetcode = nanoid(50);
        admin.isactive = false;
        admin.save().then(admin => {
          const msg = {
            to: admin.email,
            from: 'maggie@e-kitchen.com',
            subject: 'Password Reset Request',
            html: compiledResetTemplate.render({
              name: admin.name,
              passwordresetcode: admin.passwordresetcode
            })
          };
          sendgrid.send(msg);
        });
        return res.status(200).json(admin);
      }
    })
    .catch(err => res.status(500).json(err));
});

//route to reseset password
router.post('/account/passwordreset/:passwordresetcode', (req, res) => {
  const passwordresetcode = req.params.passwordresetcode;
  const password = req.body.password;
  Admin.findOne({ passwordresetcode })
    .then(admin => {
      if (!admin) {
        return res.status(400).json({ error: 'Oops! Something is not right' });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            admin.password = hash;
            admin.passwordresetcode = '';
            admin.isactive = true;
            admin.save();
            return res.status(200).json(admin);
          });
        });
      }
    })
    .catch(err => res.status(500).json(err));
});

// @route GET api/admins/current
// @desc route to get details of currently logged in admin
// @access PRIVATE
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Admin.findById(req.admin.id)
      .then(admin => {
        errors.adminNotFound = 'admin Not found';
        if (!admin) {
          return res.status(404).json(errors);
        }
        res.json({
          id: req.admin.id,
          name: req.admin.name,
          email: req.admin.email
        });
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/admin
// @desc route to delete admin account
// @access PRIVATE
router.delete(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Admin.findByIdAndRemove({
      _id: req.admin.id
    }).then(() =>
      res.json({
        success: true
      })
    );
  }
);

module.exports = router;
