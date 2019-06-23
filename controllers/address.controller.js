const Address = require("../models/Address");
const Profile = require("../models/Profile");
const User = require("../models/User");
const ValidateAddressInput = require("../validation/address");

const AddressOps = {};

AddressOps.NewAddress = async (req, res, next) => {
  try {
    const { errors, isValid } = ValidateAddressInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    const { address1, address2, state, area, isDefault } = req.body;
    const { decoded } = res;
    const profile = await Profile.findOne({ user: decoded._id });
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

AddressOps.UpdateAddress = async (req, res, next) => {
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

AddressOps.FetchAddresses = async (req, res, next) => {
  try {
    const errors = {};
    const { decoded } = res;
    const user = await User.findOne({ _id: decoded._id });
    if (!user) return res.status(400).json((errors.user = "User not found"));
    const profile = await Profile.findOne({ user: user._id });
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

AddressOps.GetAddressByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);
    if (!address) return res.status(400).json({ errors: "Address not Found" });
    return res.status(200).json(address);
  } catch (error) {
    next(error);
  }
};

AddressOps.DeleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    profile = await Address.deleteOne({ _id: id });
    return res.status(200).json({ success: true, address: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = AddressOps;
