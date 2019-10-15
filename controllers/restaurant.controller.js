const Restaurant = require('../models/Restaurant');
const validateRegistrationInput = require('../validation/restaurant-validation');
const validateLoginInput = require('../validation/login');

const RestaurantActions = {};

RestaurantActions.Register = async (req, res, next) => {
  try {
    const { restaurantname, name, email, password } = req.body;
    const { errors, isValid } = validateRegistrationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const restautant = await Restaurant.find({
      $or: [
        { email: req.body.email.toLowercase() },
        { restaurantname: req.body.restaurantname }
      ]
    });
    if (restautant) {
      errors.email = 'An account with this email already exists.';
      return res.status(400).json(errors);
    }

    const newRestaurant = await new Restaurant({
      restaurantname,
      name,
      email: email.toLowercase(),
      password: Helpers.HashValue(password)
    });

    if (newRestaurant) {
      newRestaurant.password = undefined;
      Helpers.sendMail(
        newRestaurant.email,
        'maggie@no-cookn.com',
        'Welcome to no-cookn',
        compiledWelcomeTemplate.render({
          name: newRestaurant.name.split(' ')[0]
        })
      );
      return res.status(201).json(newRestaurant);
    }
  } catch (error) {
    next(error);
  }
};

RestaurantActions.Login = async (req, res, next) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { email, password } = req.body;

    const restaurant = await Restaurant.findOne({ email: email.toLowerCase() });

    if (!restaurant) {
      errors.email = 'No account matched with email provided';
      return res.status(404).json(errors);
    }

    let isPassword = Helpers.UnHashValue(password, restaurant.password);
    if (isPassword) {
      restaurant.password = undefined;
      let token = generateToken(restaurant);
      return res.status(200).json({ token: `Bearer ${token}` });
    }
    errors.password = 'Password is incorrect';
    return res.status(401).json(errors);
  } catch (error) {
    next(error);
  }
};

RestaurantActions.GetRestaurantUser = async (req, res, next) => {
  try {
    const errors = {};
    const { decoded } = res;
    const user = await Restaurant.findById(decoded._id);
    if (!user) {
      errors.NotFound = 'Requested resource not found';
      return res.status(404).json(errors);
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

RestaurantActions.FetchAll = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    return res.status(200).json(restaurants);
  } catch (error) {
    next(error);
  }
};

RestaurantActions.DeleteAccount = async (req, res, next) => {
  try {
    const { decoded } = res;
    restaurant = await Restaurant.deleteOne(decoded._id);
    return res.status(200).json({ success: true, restaurant: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = RestaurantActions;
