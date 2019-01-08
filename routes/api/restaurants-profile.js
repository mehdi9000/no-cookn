const express = require('express');
// const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//get address by id
//get menu by id
//create menu categories e.g mains, soups, fish, options etc []//done

//Load Models
const RestaurantProfile = require('../../models/Restaurant-Profile');
const Restaurant = require('../../models/Restaurant');
const Order = require('../../models/Order');

//Load profile validation
const ValidateProfileInput = require('../../validation/restaurants-profile');
const ValidateAddressInput = require('../../validation/address');
const ValidateMenuInput = require('../../validation/menu');
const ValidateImageUpload = require('../../validation/image');

//Image uploads and storage Config
const ImageUploadConfig = require('../../config/uploads');
const uploads = ImageUploadConfig.test();
const restaurantsUpload = ImageUploadConfig.restaurant();
const menuUpload = ImageUploadConfig.menu();
//

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
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
  console.log(req.query.q);
  res.json({ msg: 'Restaurant Profile Works' });
});

// test upload
router.get('address/:address', (req, res) => {
  RestaurantProfile.findOne({ 'address._id': req.params.address }).then(
    restaurantProfile => {
      if (restaurantProfile) {
        return res.json(restaurantProfile.address);
      } else return res.json('bad');
    }
  );
});

//location search
router.post('/location-search', (req, res) => {
  let { location } = req.body;
  RestaurantProfile.find({ deliveryareas: location })
    .populate('restaurant', ['name', 'avatar', 'restaurantname', 'email'])
    .then(restaurants => {
      if (restaurants) {
        return res.status(200).json(restaurants);
      } else {
        return res.json({ msg: 'No restaurants found' });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({ error: 'something went wrong' });
    });
});

// @route Get api/restaurants-profile
// @desc route to get currently logged in restaurant from
// restaurant auth @access PRIVATE
router.get(
  '/',
  passport.authenticate('restaurants', { session: false }),
  (req, res) => {
    const errors = {};

    RestaurantProfile.findOne({
      restaurant: req.user.id
    })
      .populate('restaurant profile', ['name', 'email', 'restaurantname'])
      .then(restaurantprofile => {
        if (!restaurantprofile) {
          errors.norestaurantprofile =
            'There is no profile for this restaurant';
          return res.status(404).json(errors);
        }
        res.json(restaurantprofile);
      })
      .catch(err => res.status(404).json(err));
  }
); //tested

// @route   POST api/restaurant-profile
// @desc    Create or edit restaurant profile
// @access  Private
router.post(
  '/',
  passport.authenticate('restaurants', {
    session: false
  }),
  upload.single('logo'),
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
      restaurantProfileFields.categories = req.body.categories
        .split(',')
        .map(function(item) {
          return item.trim();
        });
    if (req.body.opensat) restaurantProfileFields.opensat = req.body.opensat;

    if (req.body.closesat) restaurantProfileFields.closesat = req.body.closesat;
    if (req.body.deliverytime)
      restaurantProfileFields.deliverytime = req.body.deliverytime;
    if (req.body.minimumorder)
      restaurantProfileFields.minimumorder = req.body.minimumorder;

    if (req.body.deliveryareas)
      restaurantProfileFields.deliveryareas = req.body.deliveryareas
        .split(',')
        .map(function(item) {
          return item.trim();
        });

    if (req.body.cuisines)
      restaurantProfileFields.cuisines = req.body.cuisines
        .split(',')
        .map(function(item) {
          return item.trim();
        });

    if (req.body.paymentsaccepted)
      restaurantProfileFields.paymentsaccepted = req.body.paymentsaccepted
        .split(',')
        .map(function(item) {
          return item.trim();
        });
    if (req.body.phone)
      restaurantProfileFields.phone = req.body.phone
        .split(',')
        .map(function(item) {
          return item.trim();
        });

    if (req.file) restaurantProfileFields.logo = req.file.path;

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
); //tested
// @route GET api/restaurants-profile/restaurant_id
// @desc get all profile data of a restaurant
// @access PRIVATE
router.get(
  '/:restaurant_id',

  (req, res) => {
    const errors = {};

    RestaurantProfile.findOne({
      restaurant: req.params.restaurant_id
    })
      .populate('restaurant', ['name', 'avatar', 'restaurantname', 'email'])
      .then(restaurantProfile => {
        if (!restaurantProfile) {
          errors.norestaurantprofile =
            'There is no profile for this restaurant';
          res.status(404).json(errors);
        }
        res.json(restaurantProfile);
        console.log(restaurantProfile.restaurant.restaurantname);
      })
      .catch(err =>
        res.status(404).json({
          restaurantProfile: 'There is no profile for this restaurant'
        })
      );
  }
); //tested

// @route GET api/profile/all
// @desc route to get all restaurant profiles
// @access PUBLIC
router.get('/partners/all-profiles/', (req, res) => {
  const errors = {};
  RestaurantProfile.find()
    .populate('restaurant', ['name', 'avatar', 'restaurantname', 'email'])
    .then(restaurantProfiles => {
      if (!restaurantProfiles) {
        errors.ProfileNotFound = 'No profiles found';
        return res.status(404).json(errors);
      }
      res.json(restaurantProfiles);
    })
    .catch(err => res.status(404).json(err));
}); //tested

// @route POST api/restaurant-profile/partners/address
// @desc route to add new address
// @access PRIVATE
router.post(
  '/partners/address',
  passport.authenticate('restaurants', { session: false }),
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
        area: req.body.area,
        phone: req.body.phone,
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
); //tested

//@route to get address by id
//GET api/restaurant-profile/:restaurant_id/:address_id
//access PUBLIC
router.get(
  '/partners/address/:address_id',
  //no auth needed
  (req, res) => {
    const address_id = req.params.address_id; //get address id
    RestaurantProfile.findOne({
      address: { $elemMatch: { _id: address_id } }
    }).then(restaurantProfile => {
      if (!restaurantProfile) {
        return res.status(404).json('restaurant not found');
      }
      // else return that single address
      else {
        const address = restaurantProfile.address;
        for (let key in address) {
          if (address[key]._id == address_id) {
            return res.status(200).json(address[key]);
          } else return res.status(400).json('no adress found');
        } //end for
      } //end else
    });
  }
);

// @route DELETE api/profile/address/:address_id
// @desc router to delete address from profile
// @access PRIVATE
router.delete(
  '/partners/address/:address_id',
  passport.authenticate('restaurants', {
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
  '/',
  passport.authenticate('restaurants', { session: false }),
  (req, res) => {
    let profile = { restaurant: req.user.id };
    let profile2 = { _id: req.user.id };
    RestaurantProfile.findByIdAndRemove(profile).then(restaurantProfile => {
      Restaurant.findByIdAndRemove(profile2).then(() =>
        res.json({ success: true })
      );
    });
  }
);

// @route   POST api/restaurant/partners/menu
// @desc    route to add food menu to a restaurant profile
// @access  PRIVATE
router.post(
  '/partners/menu',
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
    }).then(restaurantProfile => {
      // Get body
      console.log(req.body.name);
      const newMenu = {
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        deliverytime: req.body.deliverytime,
        picture: req.file.path
      };
      newMenu.extras = {};
      // split extras name and price

      if (req.body.extrasame)
        newMenu.extras.extrasname = req.body.extrasname
          .split(',')
          .map(function(item) {
            return item.trim();
          });
      if (req.body.extrasprice)
        newMenu.extras.extrasprice = req.body.extrasprice
          .split(',')
          .map(function(item) {
            return item.trim();
          });

      //add menu to menu array
      restaurantProfile.menu.unshift(newMenu);
      // save new menu to profile
      restaurantProfile
        .save()
        .then(restaurantProfile => res.json(restaurantProfile.menu));
    });
  }
); // tested

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

// @route Get api/restaurant/partners/menu/:restaurant_id
// @desc router to get all menu belonging to a restaurant
// @access PRIVATE
router.get(
  '/partners/menu/all-menu',
  passport.authenticate('restaurants', { session: false }),
  (req, res) => {
    const errors = {};
    RestaurantProfile.findOne({ restaurant: req.user.id })
      .then(restaurantProfile => {
        if (!restaurantProfile) {
          errors.norestaurantprofile = 'Illegal query. Sign in first';
          return res.status(404).json(errors);
        }
        res.json(restaurantProfile.menu);
      })
      .catch(err => res.status(404).json(err));
  }
); //tested

// @ router Update api/restaurants-profile/menu/menu_id
// @desc route to update restaurant profile
//@access PRIVATE
router.post(
  '/partners/menu/:menu_id',
  passport.authenticate('restaurants', { session: false }),
  (req, res) => {
    //check validation
    const { errors, isValid } = ValidateMenuInput(req.body);

    if (!isValid) {
      // Return error with satus 400
      return res.status(400).json(errors);
    }
    // Get fields
    const updatedMenu = {
      category: req.body.category,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    };
    //error msg
    const err = { menu: 'Menu or restaurant not found!' };
    //find restaurant  menu
    RestaurantProfile.findOne({ restaurant: req.user.id }).then(
      restaurantProfile => {
        if (restaurantProfile) {
          // Update menu
          RestaurantProfile.update(
            { 'menu._id': req.params.id },
            { $set: { 'menu.0.name': updatedMenu.name } },
            { new: true }
          ).then(restaurantMenu => res.json(restaurantMenu));
        } else {
          // return 404 error menu not  found
          return res.status(404).json(err.menu);
        }
      }
    );
  }
); //not tested

//@route to get single menu by id
//GET api/restaurant-profile/:restaurant_id/:menu_id
//access PUBLIC
router.get(
  '/partners/menu/:menu_id',
  //no auth needed
  (req, res) => {
    const menu_id = req.params.menu_id; //get menu id
    RestaurantProfile.findOne({
      menu: { $elemMatch: { _id: menu_id } }
    }).then(restaurantProfile => {
      if (!restaurantProfile) {
        return res.status(404).json('restaurant not found');
      }
      // else return that single menu
      else {
        const menu = restaurantProfile.menu;
        for (let key in menu) {
          if (menu[key]._id == menu_id) {
            return res.status(200).json(menu[key]);
          } else return res.status(400).json('no menu found');
        } //end for
      } //end else
    });
  }
);

//@route  POST api/restaurant-profiles/restaurants/partners/pictures
//@desc   route for restaurant  to add pictures to their profile
//@access PRIVATE
router.post(
  '/partners/pictures',
  passport.authenticate('restaurants', { session: false }),
  upload.single('picture'), //authenticate and verify
  (req, res) => {
    //find restaurant
    RestaurantProfile.findOne({ restaurant: req.user.id }).then(
      restaurantProfile => {
        if (restaurantProfile) {
          //collect new pictures
          const newPicture = req.file.path;
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
); // tested

// @route DELETE api/restaurant/partners/picture
// @desc  route to delete restaurant picture
// @access PRIVATE
router.delete(
  'partners/restaurant/pictures/:picture_id', //returns arraynumber of picture

  passport.authenticate('restaurants', { session: false }), //authenticate and verify
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
          return res.status(500).res.json('An error as occurred');
        } //end else
      }
    );
  }
);

//  @route GET api/restaurants-profile/partners/all-orders
//  @desc route to get all orders
//  @access PRIVaTE
router.get(
  '/partners/all-orders',
  passport.authenticate('restaurants', { session: false }),
  (req, res) => {
    //find all orders
    Order.find({ restaurant_id: req.user.id }).then(order => {
      if (order) {
        res.json(order);
      } //end if
      else {
        return res
          .status(404)
          .res.json('There are no orders for this restaurant ');
      } //end else
      return res.status(404).json('No orders for your restaurant');
    });
  }
);
//  @route POST api/restaurants-profile/partners/order/:order_id
//  @desc route to get one order
//  access PRIVATE
router.get(
  '/partners/order/:order_id',
  passport.authenticate('restaurants', { session: false }),
  (req, res) => {
    Order.findOne({ order_id: req.params.order_id }).then(order => {
      if (order) {
        order.status = req.body.status;
        order.save().then(res.json(order));
      } //end if
      else {
        return res
          .status(403, 404)
          .res.json(
            'Order not found or ' +
              'you might not have the necessary permissions for this action '
          );
      } //end else
    });
  }
);

//  @route POST api/restaurants-profile/partners/order/:order_id
//  @desc route to make restaurants change status of order
//  access PRIVATE
router.post(
  '/partners/order/:order_id',
  passport.authenticate('restaurants', { session: false }),
  (req, res) => {
    Order.findOne({ order_id: req.params.order_id }).then(order => {
      if (order) {
        order.status = req.body.status;
        order.save().then(res.json(order));
      } //end if
      else {
        return res
          .status(403, 404)
          .res.json(
            'Order not found or ' +
              'you might not have the necessary permissions for this action '
          );
      } //end else
    });
  }
);

//  @route POST api/restaurants-profile/partners/categories
//  @desc route to add menu categories
//  @access PRIVATE
router.post(
  'partners/categories',
  passport.authenticate('restaurants', { session: false }),
  (req, res) => {
    RestaurantProfile.findOne({ restaurant: req.user.id }).then(
      restaurantProfile => {
        if (!restaurantProfile) {
          res.status(404).json('Restaurant not found');
        }
        restaurantProfile.categories = req.body.categories.split(',');
        restaurantProfile.save();
      }
    );
  }
);

module.exports = router;
