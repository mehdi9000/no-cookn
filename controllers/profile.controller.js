//TODO: express validator function
const Profile = require('../models/Profile');
// const User = require("../models/User");
// const Order = require("../models/Order");

const ValidateProfileInput = require('../validation/profile');
// const ValidateAddressInput = require("../validation/address");

const ProfileOps = {};

ProfileOps.Create = async (req, res, next) => {
  try {
    const { errors, isValid } = ValidateProfileInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { decoded } = res;
    const { phone } = req.body;
    const profileFields = { phone, user: decoded._id };

    let profile = await Profile.findOne({ user: decoded._id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: decoded._id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json(profile);
    } else {
      newProfile = await new Profile(profileFields).save();
      return res.status(201).json(newProfile);
    }
  } catch (error) {
    next(error);
  }
};

ProfileOps.GetProfile = async (req, res, next) => {
  try {
    const errors = {};
    const { decoded } = res;
    const profile = await Profile.findOne({ user: decoded._id }).populate(
      'user',
      ['name', 'email']
    );
    if (!profile) {
      errors.NotFound = 'This user has no profile';
      return res.status(404).json(errors);
    }
    return res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

ProfileOps.DeleteProfile = async (req, res, next) => {
  try {
    const { decoded } = res;
    profile = await Profile.deleteOne({ user: decoded._id });
    return res.status(200).json({ success: true, profile: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = ProfileOps;
