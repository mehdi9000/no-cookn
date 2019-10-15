const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  restaurantname: {
    type: String,
    required: true
  },
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
  isactive: {
    type: Boolean,
    default: false
  },
  suspended: {
    type: Boolean,
    default: false
  },
  activationcode: {
    type: String
  },
  passwordresetcode: {
    type: String
  },
  creationdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Restaurant = mongoose.model('restaurant', RestaurantSchema);
