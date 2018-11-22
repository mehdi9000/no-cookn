
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

//get models
const Admin = require('../../../models/Admin');
const RestaurantProfile = require('../../../models/Restaurant-Profile')


//  POST api/admin/account/
//  route to Create new admin
//  @access PUBLIC
router.post('/register', 
passport.authenticate('master', {
    session: false
  }),
    (req, res)=>{
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
        activationcode: activationCode,
        admintype:"regular"
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
 }//(req,res) ends here    
)


//  DELETE api/admin/account/
// route to Delete admin
// @access PRIVATE
router.delete(
    '/',
    passport.authenticate('master', {
      session: false
    }),
    (req, res) => {
      Admin.findByIdAndRemove({
        email: req.body.email
      }).then(() =>
        res.json({
          success: true
        })
      );
    }
  );

//  POST
// Create and edit restaurant
// @access Private
router.post('/restaurant',
    passport.authenticate('admin', {
        session: false
    }),
    (req, res)=>{
        const { errors, isValid } = ValidateProfileInput(req.body);

    //check validation
    if (!isValid) {
      // Return any errors with status 400
      return res.status(400).json(errors);
    }
    // Get fields
    const restaurantProfileFields = {};
    restaurantProfileFields.restaurant = req.user.id;
    
    if (req.body.categories) restaurantProfileFields.categories = req.body.categories.split(',');
    if (req.body.opensat) restaurantProfileFields.opensat = req.body.opensat;

    if (req.body.closeat) restaurantProfileFields.closesat = req.body.closessat;

    if (req.body.deliveryareas) restaurantProfileFields.deliveryareas = req.body.deliveryareas.split(',');
    if (req.body.cuisines) restaurantProfileFields.cuisines = req.body.cuisines.split(',');
   
    if (req.body.paymentsaccepted) restaurantProfileFields.paymentsaccepted = req.body.paymentsaccepted.split(',');
    if (req.body.phone) restaurantProfileFields.phone = req.body.phone.split(',');

    RestaurantProfile.findOne({ restaurant: req.user.id }).then(
      restaurantProfile => {
        if (restaurantProfile) {
          // Update
          RestaurantProfile.findOneAndUpdate(
            { restaurant: req.user.id },
            { $set: restaurantProfileFields },
            { new: true }
          ).then(restaurantProfile => res.json(restaurantProfile));
        } else {
          // save RestaurantProfile
          new RestaurantProfile(restaurantProfileFields)
            .save()
            .then(restaurantProfile => res.json(restaurantProfile));
        }
      }
    );

 })

module.exports = router;