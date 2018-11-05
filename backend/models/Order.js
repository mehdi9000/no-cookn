// Model for Orders
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: "restaurant"
  },
  count: Number, //amount of orders for that particular menu
  creation_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "pending"
  },
  delivery_date: {
    type: Date
  }
});

module.exports = Order = mongoose.model("order schema", OrderSchema);
