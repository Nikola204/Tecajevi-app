const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  title: String,
  type: String,
  url: String,
  courseId: String
});

module.exports = mongoose.model('Content', ContentSchema);
