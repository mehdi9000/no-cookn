const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profile"
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

module.exports = Address = mongoose.model("address", AddressSchema);
