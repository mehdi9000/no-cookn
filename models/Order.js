// Model for Orders
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  restaurant_id: {
    type: Schema.Types.ObjectId,
    ref: 'restaurant'
  },
  count: Number, //amount of orders for that particular menu
  creation_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'pending'
  },
  paymenttype: {
    type: String
  },
  paymentstatus: {
    type: String
  },
  delivery_date: {
    type: Date
  },
  deliveryarea: {
    type: String
  },
  deliveryaddress: {
    type: String
  }
});

module.exports = Order = mongoose.model('order schema', OrderSchema);
