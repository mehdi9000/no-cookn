const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  // location: {
  //   type: String
  // },
  phone: {
    type: String,
    required: true
  },
  address: [
    {
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
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
