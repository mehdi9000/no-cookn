// Model for Orders
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  order_no:{
    type:String,
    required:true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required:"true"
  },
  
  restaurant_id: {
    type: String,
    required: true
    
  },
  item:[{
    name:String,
    description:String,
    price:Number,
    picture:String,
    deliverytime:String,
    extras:[
      {
        itemname: String,
        itemprice: Number
      }
    ]
  }],
  creation_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "pending"
  },
  delivery_date: {
    type: String
  }
});

module.exports = Order = mongoose.model("order schema", OrderSchema);
