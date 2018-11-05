const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MasterSchema = new Schema({
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
  isactive: {
    type: Boolean,
    default: false
  },
  activationcode: {
    type: String
  },
  passwordresetcode: {
    type: String
  },
  usercategory: {
    type: String
  },
  role: {
    type: String
  },
  creationdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Category = mongoose.model('categories', CategorySchema);
