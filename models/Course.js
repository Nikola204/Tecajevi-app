const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  duration: String,
  instructor: String
});

module.exports = mongoose.model('Course', CourseSchema);
