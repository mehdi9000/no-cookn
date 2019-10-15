const RestaurantProfile = require('../../models/Restaurant-Profile');
const Restaurant = require('../../models/Restaurant');

const RestaurantProfileActions = {};

RestaurantProfileActions.Create = async (req, res, next) => {
  try {
    const { decoded } = res;
    const {
      categories,
      opensat,
      closesat,
      deliverytime,
      minimumorder,
      website,
      deliveryareas,
      cuisines,
      paymentsaccepted,
      phone
    } = req.body;
    const { errors, isValid } = ValidateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const restaurant = await Restaurant.findById(decoded._id);
    if (!restaurant)
      return res.status(404).json({ errors: 'No restaurant match' });
    else {
      const fields = {
        opensat,
        closesat,
        minimumorder,
        website,
        deliverytime,
        restaurant: decoded._id,
        categories: categories.map(item => item.trim()),
        cuisines: cuisines.map(item => item.trim()),
        deliveryareas: deliveryareas.map(item => item.trim()),
        phone: phone.map(item => item.trim()),
        paymentsaccepted: paymentsaccepted.map(item => {
          item.trim();
        }),
        logo: req.file.path
      };
      let restaurantProfile = await RestaurantProfile.findOne({
        restaurant: decoded._id
      });
      if (restaurantProfile) {
        let updatedProfile = await findOneAndUpdate(
          { restaurant: decoded._id },
          { $set: fields },
          { new: true }
        );
        return res.status(200).json(updatedProfile);
      } else {
        newProfile = await new RestaurantProfile(fields).save();
        return res.status(201).json(newProfile);
      }
    }
  } catch (error) {
    next(error);
  }
};

RestaurantProfileActions.FetchProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    let profile = await RestaurantProfile.findOne({ restaurant: id }).populate(
      'restaurant',
      ['name', 'restaurantname', 'email']
    );
    if (!profile)
      return res
        .status(404)
        .json({ errors: 'No associated profile for requested resource' });
    return res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

module.exports = RestaurantProfileActions;
