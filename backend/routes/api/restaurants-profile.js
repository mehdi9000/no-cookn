const express = require("express");
// const mongoose = require('mongoose');
const passport = require("passport");
const router = express.Router();

//Load Models
const RestaurantProfile = require("../../models/Restaurant-Profile");
const Restaurant = require("../../models/Restaurant");
const Order = require("../../models/Order");

//Load profile validation
const ValidateProfileInput = require("../../validation/profile");
const ValidateAddressInput = require("../../validation/address");
const ValidateMenuInput = require("../../validation/menu");
const ValidateImageUpload = require("../../validation/image");

router.get("/test", (req, res) =>
  res.json({ msg: "Restaurant Profile Works" })
);

// @route Get api/restaurants-profile
//@desc route to get currently logged in restaurant from
// restaurant auth @access PRIVATE
router.get(
  "/",
  passport.authenticate("restaurants", { session: false }),
  (req, res) => {
    const errors = {};

    RestaurantProfile.findOne({
      restaurant: req.user.id
    })
      .populate("restaurant profile", ["name", "email"])
      .then(restaurantprofile => {
        if (!restaurantprofile) {
          errors.norestaurantprofile =
            "There is no profile for this restaurant";
          return res.status(404).json(errors);
        }
        res.json(restaurantprofile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/restaurant-profile
// @desc    Create or edit restaurant profile
// @access  Private
router.post(
  "/",
  passport.authenticate("restaurants", { session: false }),
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
    if (req.body.phone) restaurantProfileFields.phone = req.body.phone;
    if (req.body.location) restaurantProfileFields.location = req.body.location;

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
// @route GET api/restaurants-profile/restaurant_id
router.get(
  "/:restaurant_id",

  (req, res) => {
    const errors = {};

    RestaurantProfile.findOne({
      restaurant: req.params.restaurant_id
    })
      .populate("restaurant", ["name", "email"])
      .then(restaurantProfile => {
        if (!restaurantProfile) {
          errors.norestaurantprofile =
            "There is no profile for this restaurant";
          res.status(404).json(errors);
        }

        res.json(restaurantProfile);
      })
      .catch(err =>
        res.status(404).json({
          restaurantProfile: "There is no profile for this restaurant"
        })
      );
  }
);

// @route GET api/profile/all
// @desc route to get all restaurant profiles
// @access PUBLIC
router.get("/partners/all-profiles/", (req, res) => {
  const errors = {};
  RestaurantProfile.find()
    .populate("restaurant", ["name", "avatar"])
    .then(restaurantProfiles => {
      if (!restaurantProfiles) {
        errors.ProfileNotFound = "No profiles found";
        return res.status(404).json(errors);
      }
      res.json(restaurantProfiles);
    })
    .catch(err => res.status(404).json(err));
});

// @route POST api/restaurant-profile/partners/address
// @desc route to add new address
// @access PRIVATE
router.post(
  "/partners/address",
  passport.authenticate("restaurants", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateAddressInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    RestaurantProfile.findOne({
      restaurant: req.user.id
    }).then(restaurantProfile => {
      const newAddress = {
        address1: req.body.address1,
        address2: req.body.address2,
        state: req.body.state,
        city: req.body.city,
        default: req.body.default
      };
      //add experience to array on profile model
      restaurantProfile.address.unshift(newAddress);
      //save the profile
      restaurantProfile
        .save()
        .then(restaurantProfile => res.json(restaurantProfile));
    });
  }
);

// @route DELETE api/profile/address/:address_id
// @desc router to delete address from profile
// @access PRIVATE
router.delete(
  "/partners/address/:address_id",
  passport.authenticate("restaurants", {
    session: false
  }),
  (req, res) => {
    RestaurantProfile.findOne({
      restaurant: req.user.id
    })
      .then(restaurantProfile => {
        restaurantProfile.address.remove({
          _id: req.params.address_id
        });
        restaurantProfile
          .save()
          .then(restaurantProfile => res.json(restaurantProfile.address))
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  }
);

// @route DELETE api/profile
// @desc route to delete profile and user account
// @access PRIVATE
router.delete(
  "/",
  passport.authenticate("restaurants", { session: false }),
  (req, res) => {
    RestaurantProfile.findByIdAndRemove({ restaurant: req.user.id }).then(
      restaurantProfile => {
        Restaurant.findByIdAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      }
    );
  }
);

// @route   POST api/restaurant/partners/menu
// @desc    route to add food menu to a restaurant profile
// @access  PRIVATE
router.post(
  "/partners/menu",
  passport.authenticate("restaurants", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateMenuInput(req.body);

    //check validation
    if (!isValid) {
      // Return error with satus 400
      return res.status(400).json(errors);
    }
    RestaurantProfile.findOne({
      restaurant: req.user.id
    }).then(restaurantProfile => {
      console.log(restaurantProfile.menu);
      // Get body
      const newMenu = {
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        picture: req.body.picture,
        time: req.body.time
      };
      //add menu to menu array
      restaurantProfile.menu.unshift(newMenu);
      // save new menu to profile
      restaurantProfile
        .save()
        .then(restaurantProfile => res.json(restaurantProfile));
    });
  }
);

// @route Delete api/restaurants/menu/:menu_id
// @desc router to delete menu from restaurant's profile
// @access PRIVATE
router.delete(
  "partners/menu/:menu_id",
  passport.authenticate("restaurants", {
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
        RestaurantProfile.save()
          .then(restaurantProfile => res.json(restaurantProfile.menu))
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  }
);

// @route Get api/restaurant/partners/menu/:restaurant_id
// @desc router to get all menu belonging to a restaurant
// @access PRIVATE
router.get(
  "/partners/menu/all-menu",
  passport.authenticate("restaurants", { session: false }),
  (req, res) => {
    const errors = {};
    RestaurantProfile.findOne({ restaurant: req.user.id })
      .then(restaurantProfile => {
        if (!restaurantProfile) {
          errors.norestaurantprofile = "Illegal query. Sign in first";
          return res.status(404).json(errors);
        }
        res.json(restaurantProfile.menu);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/restaurant-profile
// @desc    Create or edit restaurant profile
// @access  Private
router.post(
  "/",
  passport.authenticate("restaurants", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateProfileInput(req.body);

    //check validation
    if (!isValid) {
      // Return any errors with status 400
      return res.status(400).json(errors);
    }
    // Get fields
    const restaurantProfileFields = {};
    restaurantProfileFields.user = req.user.id;
    if (req.body.phone) restaurantProfileFields.phone = req.body.phone;
    if (req.body.location) restaurantProfileFields.location = req.body.location;

    RestaurantProfile.findOne({ restaurant: req.user.id }).then(
      restaurantProfile => {
        if (restaurantProfile) {
          // Update
          RestaurantProfile.findOneAndUpdate(
            { restaurant: req.user.id },
            { $set: restaurantProfile.Fields },
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

//  @route POST api/restaurants-profile/restaurant_id
//  @desc route to get all profile info of a restaurant
//  @access  PRIVATE
router.post(
  "/restaurant/:restaurant_id",
  passport.authenticate("restaurants", {
    session: false
  }),
  (req, res) => {
    const errors = {};

    RestaurantProfile.findOne({
      restaurant: req.params.restaurant_id
    })
      .populate("restaurantProfile", ["name", "email"])
      .then(restaurantProfile => {
        if (!restaurantProfile) {
          errors.norestaurantprofile =
            "There is no profile for this restaurant";
          res.status(404).json(errors);
        }

        res.json(restaurantProfile);
      })
      .catch(err =>
        res.status(404).json({
          restaurantProfile: "There is no profile for this restaurant"
        })
      );
  }
);

// @route GET api/profile/all
// @desc route to get all restaurant profiles
// @access PUBLIC
router.get("/partners/all-profiles/", (req, res) => {
  const errors = {};
  RestaurantProfile.find()
    .populate("restaurant profile", ["name", "avatar"])
    .then(restaurantProfiles => {
      if (!restaurantProfiles) {
        errors.ProfileNotFound = "No profiles found";
        return res.status(404).json(errors);
      }
      res.json(restaurantProfiles);
    })
    .catch(err => res.status(404).json(err));
});

// @route POST api/restaurant-profile/partners/address
// @desc route to add new address
// @access PRIVATE
router.post(
  "/partners/address",
  passport.authenticate("restaurants", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateAddressInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    RestaurantProfile.findOne({
      restaurant: req.user.id
    }).then(restaurantProfile => {
      const newAddress = {
        address1: req.body.address1,
        address2: req.body.address2,
        state: req.body.state,
        city: req.body.city,
        default: req.body.default
      };
      //add experience to array on profile model
      restaurantProfile.address.unshift(newAddress);
      //save the profile
      restaurantProfile
        .save()
        .then(restaurantProfile => res.json(restaurantProfile));
    });
  }
);

// @route DELETE api/profile/address/:address_id
// @desc router to delete address from profile
// @access PRIVATE
router.delete(
  "partners/address/:address_id",
  passport.authenticate("restaurants", {
    session: false
  }),
  (req, res) => {
    RestaurantProfile.findOne({
      restaurant: req.user.id
    })
      .then(restaurantProfile => {
        restaurantProfile.address.remove({
          _id: req.params.address_id
        });
        restaurantProfile
          .save()
          .then(restaurantProfile => res.json(restaurantProfile.address))
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  }
);

// @route DELETE api/profile
// @desc route to delete profile and user account
// @access PRIVATE
router.delete(
  "/",
  passport.authenticate("restaurants", { session: false }),
  (req, res) => {
    RestaurantProfile.findByIdAndRemove({ restaurant: req.user.id }).then(
      restaurantProfile => {
        Restaurant.findByIdAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      }
    );

    // @ router Update api/restaurants-profile/menu/menu_id
    // @desc route to update restaurant profile
    // @access PRIVATE
// router.update(
//   "/menu/menu_id",
//   passport.authenticate("restaurants", { session: false }),

// )
//     //check validation
    if (!isValid) {
      // Return error with satus 400
      return res.status(400).json(errors);
    }
    // Get fields
    const updatedProfile = {
      id: req.params.menu_id,
      category: req.body.category,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      picture: req.body.picture
    };
    //error msg
    const err = { menu: "Menu or restaurant not found!" };
    //find restaurant  menu
    RestaurantProfile.findOne({
      //restaurant: req.params.restaurant_id } && {
      menu: [{ id: req.params.menu_id }]
    }).then(restaurantMenu => {
      if (restaurantMenu) {
        // Update menu
        RestaurantProfile.update(
          { menu: [{ id: req.params.menu_id }] },
          { $set: updatedProfile },
          { new: true }
        ).then(restaurantMenu => res.json(restaurantMenu));
      } else {
        // return 404 error menu not  found
        return res.status(404).res.json(err.menu);
      }
    });
  }
);

//@route  POST api/restaurant-profiles/restaurants/partners/add-pictures
//@desc   route for restaurant  to add pictures to their profile
//@access PRIVATE
router.post(
  "/partners/pictures",
  passport.authenticate("restaurants", { session: false }), //authenticate and verify
  (req, res) => {
   
 const { errors, isValid } = ValidateImageUpload(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    //find user
    RestaurantProfile.findOne({ restaurant: req.user.id }).then(
      restaurantProfile => {
        if (restaurantProfile) {
          //collect new pictures
          const newPicture = req.body.picture;
          //add pictures
          restaurantProfile.pictures.unshift(newPicture);
          //save profile
          restaurantProfile
            .save()
            .then(restaurantProfile => res.json(restaurantProfile.pictures));
        } //end if
        else {
          return res.status(404).json('profile not found');
        } //end else
      }
    );
  }
);

// @route DELETE api/restaurant/partners/picture
// @desc  route to delete restaurant picture
// @access PRIVATE
router.delete(
  "partners/restaurant/pictures/:picture_id",
  passport.authenticate("restaurants", { session: false }), //authenticate and verify
  (req, res) => {
    //find restaurant profile
    RestaurantProfile.findOne({ restaurant: req.user.id }).then(
      restaurantProfile => {
        if (restaurantProfile) {
          //Get  picture to delete
          let pictureToDelete = req.params.picture_id;
          //Delete pictures
          restaurantProfile.pictures
            .findByIdAndRemove({ id: pictureToDelete })
            .then(restaurantProfile => res.json(restaurantProfile.pictures));
        } //end if
        else {
          return res.status(500).res.json("An error as occurred");
        } //end else
      }
    );
  }
);

//  @route GET api/restaurants-profile/partners/all-orders
//  @desc route to get all orders
//  @access PRIVaTE
router.get(
  "/all-orders",
  passport.authenticate("restaurants", { session: false }),
  (req, res) => {

    //find all rorders
    Order.find({ restaurant_id: req.user.id })
      .populate("user", "_id")
      .populate("restaurant", "_id")
      .then(order => {
        if (order) {
          res.json(order);
        } //end if
        else {
          return res
            .status(404)
            .res.json("There are no orders for this restaurant ");
        } //end else
      });
  }
);

//  @route POST api/restaurants-profile/partners/order/:order_id
//  @desc route to make restaurants change status of order
//  access PRIVATE
router.post(
  "/partners/order/:order_id",
  passport.authenticate("restaurants", { session: false }),
  (req, res) => {
    /*
    Validation file not yet written
    */
    //find restaurant
    Order.findOne({ _id: req.params.order_id }).then(order => {
      if (order) {
        order.status = req.body.status;
        order.save().then(res.json(order));
      } //end if
      else {
        return res
          .status(403, 404)
          .res.json(
            "Order not found or " +
              "you might not have the necessary permissions for this action "
          );
      } //end else
    });
  }
);
module.exports = router;
