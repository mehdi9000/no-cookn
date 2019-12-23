const Helpers = require("../utils/helpers");
const generateToken = require("../middleware/auth").generateAccessToken;
const nanoid = require("nanoid");
const hogan = require("hogan.js");
const fs = require("fs");
const validateRegistrationInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require("../models/User");
const RestaurantProfile = require("../models/restaurantProfile");
const Restaurant = require("../models/Restaurant");

const WelcomeTemplate = fs.readFileSync("mails/welcome.hjs", "utf-8");
const ResetTemplate = fs.readFileSync("mails/reset.hjs", "utf-8");
const compiledWelcomeTemplate = hogan.compile(WelcomeTemplate);
const compiledResetTemplate = hogan.compile(ResetTemplate);

const UserOps = {};

UserOps.Register = async (req, res, next) => {
  try {
    const { errors, isValid } = validateRegistrationInput(req.body);
    const { email, password, name } = req.body;
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      errors.email = "An account with this email already exists.";
      return res.status(400).json(errors);
    }
    const newUser = await new User({
      name,
      email: email.toLowerCase(),
      password: Helpers.HashValue(password)
    }).save();

    if (newUser) {
      newUser.password = undefined;
      Helpers.sendMail(
        newUser.email,
        "maggie@no-cookn.com",
        "Welcome to no-cookn",
        compiledWelcomeTemplate.render({
          name: newUser.name.split(" ")[0]
        })
      );
      return res.status(201).json(newUser);
    }
  } catch (error) {
    next(error);
  }
};

UserOps.Login = async (req, res, next) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      errors.email = "No account matched with email provided";
      return res.status(404).json(errors);
    }

    let isPassword = Helpers.UnHashValue(password, user.password);
    if (isPassword) {
      user.password = undefined;
      let token = generateToken(user);
      return res.status(200).json({ token: `Bearer ${token}` });
    }
    errors.password = "Password is incorrect";
    return res.status(401).json(errors);

    // if (user.suspended === true) {
    //   errors.suspended =
    //     'Your account has been suspended temporarily. Send us a mail at hello@nocookn.com, to talk to a support contact.';
    //   return res.status(400).json({ errors });
    // }
  } catch (error) {
    next(error);
  }
};

UserOps.PasswordResetRequest = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      res
        .status(404)
        .json({ error: "No account matched with the email provided." });

    user.passwordresetcode = nanoid(50);
    updatedUser = await user.save();

    if (updatedUser) {
      Helpers.sendMail(
        updatedUser.email,
        "maggie@no-cookn.com",
        "Password Reset",
        compiledResetTemplate.render({
          name: updatedUser.name.split(" ")[0]
        })
      );
      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    next(error);
  }
};

UserOps.ResetPassword = async (req, res, next) => {
  try {
    const { passwordresetcode } = req.params;
    console.log(passwordresetcode);
    const { password } = req.body;
    const user = await User.findOne({ passwordresetcode });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Link is broken. Click the link in your email again." });
    }
    user.password = Helpers.HashValue(password);
    user.passwordresetcode = undefined;
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

UserOps.GetCurrentUser = async (req, res, next) => {
  try {
    const errors = {};
    const { decoded } = res;
    const user = await User.findById(decoded._id);
    if (!user) {
      errors.NotFound = "Requested resource not found";
      return res.status(404).json(errors);
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

UserOps.DeleteAccount = async (req, res, next) => {
  try {
    const { decoded } = res;
    user = await User.deleteOne(decoded._id);
    return res.status(200).json({ success: true, user: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = UserOps;
