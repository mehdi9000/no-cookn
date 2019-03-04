const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'restaurant'
  },
  restaurantprofile: {
    type: Schema.Types.ObjectId,
    ref: 'restaurantProfile'
  },
  category: {
    type: String
  },
  menuname: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  deliverytime: {
    type: String
  },
  extrasname: [],
  extrasprice: []
});
module.exports = Menu = mongoose.model('menu', MenuSchema);
