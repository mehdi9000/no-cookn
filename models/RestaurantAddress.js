const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantAddressSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'restaurantProfile'
  },
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String
  },
  state: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  creationdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = RestaurantAddress = mongoose.model(
  'restaurantAddress',
  RestaurantAddressSchema
);
