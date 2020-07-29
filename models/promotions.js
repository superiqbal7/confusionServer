// Grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
// Add the currency type to the mongoose Schema types
const Currency = mongoose.Types.Currency;
// Create a Schema
var promotionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  price: {
    type: Currency,
    required: true,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
// The schema is useless so far
// we need to create a model using it
// Make this available to our Node application
module.exports = mongoose.model('Promotion', promotionSchema);

