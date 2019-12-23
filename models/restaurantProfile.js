const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantProfileSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "restaurant"
  },
  website: {
    type: String
  },
  logo: {
    type: String
  },
  opensat: {
    type: String,
    required: true
  },
  closesat: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  minimumorder: {
    type: String,
    required: true
  },
  deliverytime: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  favourites: {
    type: Number,
    default: 0
  },
  creationdate: {
    type: Date,
    default: Date.now
  },

  deliveryareas: [
    {
      type: String
    }
  ],
  cuisines: [
    {
      type: String
    }
  ],
  paymentsaccepted: [
    {
      type: String
    }
  ],
  categories: [
    {
      type: String
    }
  ],
  menucategories: [
    {
      type: String
    }
  ],
  phone: [
    {
      type: String
    }
  ]
});

module.exports = RestaurantProfile = mongoose.model(
  "restaurantProfile",
  RestaurantProfileSchema
);
