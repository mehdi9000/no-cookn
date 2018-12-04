const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  // isactive: {
  //   type: Boolean,
  //   default: false
  // },
  // activationcode: {
  //   type: String
  // },
  suspended:{
    type: Boolean,
    default:  false,
  },
  passwordresetcode: {
    type: String
  },
  usercategory: {
    type: String
  },
  creationdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
