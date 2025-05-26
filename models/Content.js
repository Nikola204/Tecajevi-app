const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  title: String,
  type: String,
  url: String,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }
});

module.exports = mongoose.model('Content', ContentSchema);
