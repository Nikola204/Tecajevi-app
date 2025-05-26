const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  duration: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // obavezno neka se podudara s imenom modela (ne kolekcije)
  }
});

module.exports = mongoose.model('Course', CourseSchema);
