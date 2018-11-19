const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  admintype: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  
  // avatar: {
  //   type: String
  // },
 
  passwordresetcode: {
    type: String
  },
 
  creationdate: {
    type: Date,
    default: Date.now
  },
  activationcode:{
    type:String,
    default:''
  }
});

module.exports = Admin = mongoose.model('admin', AdminSchema);
