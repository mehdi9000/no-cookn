const Address = require("../models/restaurantAddress");
// const Profile = require("../models/restaurant-Profile");
// const Restaurant = require("../models/restaurant");
const ValidateAddressInput = require("../validation/address");

const AddressActions = {};

AddressActions.NewAddress = async (req, res, next) => {
  try {
    const { errors, isValid } = ValidateAddressInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    const { address1, address2, state, area, isDefault } = req.body;
    const { decoded } = res;
    const profile = await Profile.findOne({ Restaurant: decoded._id });
    if (!profile) {
      errors.NotFound = "User has no profile";
      return res.status(400).json(errors);
    }
    const address = await new Address({
      profile: profile.id,
      address1,
      address2,
      state,
      area,
      isDefault
    }).save();
    return res.status(201).json(address);
  } catch (error) {
    next(error);
  }
};

AddressActions.UpdateAddress = async (req, res, next) => {
  try {
    const { errors, isValid } = ValidateAddressInput(req.body);
    const { id } = req.params;
    const { address1, address2, state, area, isDefault } = req.body;
    const addressFields = { address1, address2, state, area, isDefault };
    if (!isValid) return res.status(400).json(errors);
    let address = await Address.updateOne({ _id: id }, { $set: addressFields });
    return res.status(200).json(address);
  } catch (error) {
    next(error);
  }
};

AddressActions.FetchAddresses = async (req, res, next) => {
  try {
    const errors = {};
    const { decoded } = res;
    const restaurant = await Restaurant.findOne({ _id: decoded._id });
    if (!restaurant)
      return res.status(400).json((errors.restaurant = "Restaurant not found"));
    const profile = await Profile.findOne({ restaurant: restaurant._id });
    if (!profile)
      return res
        .status(400)
        .json((errors.profile = "This User has no profile"));

    const addresses = await Address.find({ profile: profile._id });
    return res.status(200).json(addresses);
  } catch (error) {
    next(error);
  }
};

AddressActions.GetAddressByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);
    if (!address) return res.status(400).json({ errors: "Address not Found" });
    return res.status(200).json(address);
  } catch (error) {
    next(error);
  }
};

AddressActions.DeleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    profile = await Address.deleteOne({ _id: id });
    return res.status(200).json({ success: true, address: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = AddressActions;
