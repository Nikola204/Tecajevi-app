const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  name: String,
  price: Number,
  features: String,
  duration: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Package', PackageSchema);
