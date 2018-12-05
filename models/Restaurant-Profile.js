const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantProfileSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'restaurant'
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  logo: {
    type: String
  },
  categories: [
    {
      type: String,
      required: true
    }
  ],
  opensat: {
    type: String,
    required: true
  },
  closesat: {
    type: String,
    required: true
  },
  minimumorder: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  favourites: {
    type: Number,
    default: 0
  },
  address: [
    {
      phone: {
        type: String
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
      default: {
        type: Boolean,
        default: false
      }
    }
  ],
  creationdate: {
    type: Date,
    default: Date.now
  },
  Categories: [],
  menu: [
    {
      category: {
        type: String
      },
      name: {
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
      extrasprice:[],
    }
  ],
  order: [
    {
      type: Schema.Types.ObjectId,
      ref: 'order'
    }
  ],
  deliveryareas: [{ type: String }],
  cuisines: [{ type: String }],
  paymentsaccepted: [{ type: String }],
  pictures: [{ type: String, default: '' }],
  phone: [
    {
      type: String
    }
  ]
});

module.exports = RestaurantProfile = mongoose.model(
  'restaurantProfile',
  RestaurantProfileSchema
);
