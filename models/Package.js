const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  name: String,
  price: Number,
  features: String,
  duration: String
});

module.exports = mongoose.model('Package', PackageSchema);
