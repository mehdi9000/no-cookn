const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nanoid = require("nanoid");
const passport = require("passport");
const sendgrid = require("@sendgrid/mail");
const hogan = require("hogan.js");
const fs = require("fs");
const keys = require("../../../config/keys");

sendgrid.setApiKey(keys.sendGridApi);

//get models
const Admin = require("../../../models/Admin");
const RestaurantProfile = require("../../../models/Restaurant-Profile");

//  POST api/admin/account/
//  route to Create new admin
//  @access PUBLIC
router.post(
  "/register",
  passport.authenticate("master", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateRegistrationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Admin.findOne({
      email: req.body.email
    }).then(admin => {
      if (admin) {
        errors.email = "Email already exists";
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
          admintype: "regular"
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
                  from: "maggie@e-kitchen.com",
                  subject: "Welcome to No-Cookn admin Monitor",
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
  } //(req,res) ends here
);

//  DELETE api/admin/account/
// route to Delete admin
// @access PRIVATE
router.delete(
  "/",
  passport.authenticate("master", {
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
router.post(
  "/restaurant",
  passport.authenticate("admin", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = ValidateProfileInput(req.body);

    //check validation
    if (!isValid) {
      // Return any errors with status 400
      return res.status(400).json(errors);
    }
    // Get fields
    const restaurantProfileFields = {};
    restaurantProfileFields.restaurant = req.user.id;

    if (req.body.categories)
      restaurantProfileFields.categories = req.body.categories.split(",");
    if (req.body.opensat) restaurantProfileFields.opensat = req.body.opensat;

    if (req.body.closeat) restaurantProfileFields.closesat = req.body.closessat;

    if (req.body.deliveryareas)
      restaurantProfileFields.deliveryareas = req.body.deliveryareas.split(",");
    if (req.body.cuisines)
      restaurantProfileFields.cuisines = req.body.cuisines.split(",");

    if (req.body.paymentsaccepted)
      restaurantProfileFields.paymentsaccepted = req.body.paymentsaccepted.split(
        ","
      );
    if (req.body.phone)
      restaurantProfileFields.phone = req.body.phone.split(",");

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
  }
);
//  GET api/admin/actions/all-restaurants
//  @desc route to view all restaurants
//  access PRIVATE
router.get(
  "/all-restaurants",
  //no auth needed
  (req, res) => {
    RestaurantsProfile.find()
      .populate("restaurant", ["name", "email"])
      .then(restaurantProfile => {
        if (!restaurantProfile) {
          res.status(404).json("No restaurant found");
        }
        res.status(200).json(restaurantProfile);
      });
  }
);

//  POST api/admin/actions/restaurant/:resturant_id'
//  @desc route to delete restaurant
//  access PRIVATE
router.delete(
  "/restaurant/:resturant_id",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    //delete profile
    RestaurantProfile.findOneAndRemove({
      restaurant: req.params.restaurant_id
    }).then(() => {
      // delete account
      Restaurant.findByIdAndRemove(req.params.restaurant_id).then(() => {
        res.status(200).json("Success");
      });
    });
  }
);

//  POST api/admin/actions/restaurant/suspend/:restaurant_id
//  @desc route to suspend and unsuspend restaurant
//  access PRIVATE
router.post(
  "/restaurant/suspend/:restaurant_id",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    Restaurant.findOne({id: req.params.restaurant_id }).then(
      restaurant=> {
        if(restaurant){
          if(restaurant.suspended == false){
          restaurant.suspended = true;
          }
          else {
            restaurant.suspended = false;
          }
          restaurant.save();
          res.status(200).json("success")
      }//end if
      else{
        return res.status(404).json("Not found!")
      }//end else
    }
    );
  }
);



//  GET api/admin/actions/all-users
//  @desc route to view all users
//  access PRIVATE
router.get(
  "all-users",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    Profile.find()
      .populate("user", ["name", "email"])
      .then(profile => {
        if (!profile) {
          res.status(404).json("No users found");
        }
        res.status(200).json(profile);
      });
  }
);

//  DELETE api/admin/actions/user/:user_id
//  @desc route to delete user
//  access PRIVATE
router.delete(
  "/user/:user_id",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    //delete profile
    Profile.findOneAndRemove({ user: req.params.restaurant_id }).then(() => {
      // delete account
      User.findByIdAndRemove(req.params.restaurant_id).then(() => {
        res.status(200).json("Success");
      });
    });
  }
);

//  POST api/admin/actions/restaurant/suspend/:user_id
//  @desc route to suspend and unsuspend user
//  access PRIVATE
router.post(
  "/restaurant/suspend/:user_id",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    User.findOne({id: req.params.user_id }).then(
      user=> {
        if(user){
          if(user.suspended == false){
          user.suspended = true;
          }
          else {
            user.suspended = false;
          }
          user.save();
          res.status(200).json("success")
      }//end if
      else{
        return res.status(404).json("Not found!")
      }//end else
    }
    );
  }
);

module.exports = router;
