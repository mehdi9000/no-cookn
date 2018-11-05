const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String
  },
  creationdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Category = mongoose.model('categories', CategorySchema);
