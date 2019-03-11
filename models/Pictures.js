const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'restaurant'
  },
  restaurantprofile: {
    type: Schema.Types.ObjectId,
    ref: 'restaurantProfile'
  }
});

module.exports = Picture = mongoose.model('picture', PictureSchema);
