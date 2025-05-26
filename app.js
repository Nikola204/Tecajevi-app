const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MongoDB konekcija
mongoose.connect('mongodb://localhost:27017/trecajevi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Spojeno na MongoDB'))
.catch(err => console.error('❌ Greška pri spajanju:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Uvoz modela
const Item = require('./models/Item');

// Rute

// GET - prikaz svih podataka
app.get('/', async (req, res) => {
  const items = await Item.find();
  res.render('index', { items });
});

// POST - dodavanje novog itema
app.post('/add', async (req, res) => {
  const { name, quantity, description } = req.body;
  await Item.create({ name, quantity, description });
  res.redirect('/');
});

// POST - brisanje itema
app.post('/delete/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// POST - ažuriranje itema
app.post('/update/:id', async (req, res) => {
  const { name, quantity, description } = req.body;
  await Item.findByIdAndUpdate(req.params.id, { name, quantity, description });
  res.redirect('/');
});

//USERS RUTE

const User = require('./models/User');

// Prikaz svih korisnika
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.render('users', { users });
});

// Dodavanje korisnika
app.post('/users/add', async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  await User.create({ first_name, last_name, email, password, role });
  res.redirect('/users');
});

// Brisanje korisnika
app.post('/users/delete/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/users');
});

// Ažuriranje korisnika
app.post('/users/update/:id', async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  await User.findByIdAndUpdate(req.params.id, { first_name, last_name, email, password, role });
  res.redirect('/users');
});


//COURSE RUTE
const Course = require('./models/Course');

// GET - prikaz svih tečajeva
/*app.get('/courses', async (req, res) => {
  const courses = await Course.find();
  res.render('courses', { courses });
});*/
app.get('/courses', async (req, res) => {
  const courses = await Course.find().populate('instructor');
  const instructors = await User.find({ role: 'instruktor' });
  res.render('courses', { courses, instructors });
});

// POST - dodavanje tečaja
app.post('/courses/add', async (req, res) => {
  const { title, description, price, duration, instructor } = req.body;
  await Course.create({ title, description, price, duration, instructor });
  res.redirect('/courses');
});

// POST - brisanje tečaja
app.post('/courses/delete/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.redirect('/courses');
});

// POST - ažuriranje tečaja
app.post('/courses/update/:id', async (req, res) => {
  const { title, description, price, duration, instructor } = req.body;
  await Course.findByIdAndUpdate(req.params.id, { title, description, price, duration, instructor });
  res.redirect('/courses');
});

//COONTENT RUTE
const Content = require('./models/Content');

/*app.get('/content', async (req, res) => {
  const contents = await Content.find();
  res.render('content', { contents });
});*/
app.get('/content', async (req, res) => {
  const contents = await Content.find().populate('courseId');
  const courses = await Course.find();
  res.render('content', { contents, courses });
});

app.post('/content/add', async (req, res) => {
  const { title, type, url, courseId } = req.body;
  await Content.create({ title, type, url, courseId });
  res.redirect('/content');
});

app.post('/content/delete/:id', async (req, res) => {
  await Content.findByIdAndDelete(req.params.id);
  res.redirect('/content');
});

app.post('/content/update/:id', async (req, res) => {
  const { title, type, url, courseId } = req.body;
  await Content.findByIdAndUpdate(req.params.id, { title, type, url, courseId });
  res.redirect('/content');
});

//PACKAGE RUTE
const Package = require('./models/Package');

app.get('/packages', async (req, res) => {
  const users = await User.find(); // da imaš opcije u <select>
  const packages = await Package.find().populate('userId');
  res.render('packages', { packages, users });
});

app.post('/packages/add', async (req, res) => {
  const { name, price, features, duration, userId } = req.body;
  await Package.create({ name, price, features, duration, userId });
  res.redirect('/packages');
});

app.post('/packages/delete/:id', async (req, res) => {
  await Package.findByIdAndDelete(req.params.id);
  res.redirect('/packages');
});

app.post('/packages/update/:id', async (req, res) => {
  const { name, price, features, duration, userId } = req.body;
  await Package.findByIdAndUpdate(req.params.id, { name, price, features, duration, userId });
  res.redirect('/packages');
});

//CERTIFICATE RUTE
const Certificate = require('./models/Certificate');

app.get('/certificates', async (req, res) => {
  const certificates = await Certificate.find()
    .populate('userId')
    .populate('courseId');

  const users = await User.find();
  const courses = await Course.find();

  res.render('certificates', { certificates, users, courses });
});

app.post('/certificates/add', async (req, res) => {
  const { userId, courseId, issueDate } = req.body;
  await Certificate.create({ userId, courseId, issueDate });
  res.redirect('/certificates');
});

app.post('/certificates/delete/:id', async (req, res) => {
  await Certificate.findByIdAndDelete(req.params.id);
  res.redirect('/certificates');
});

app.post('/certificates/update/:id', async (req, res) => {
  const { userId, courseId, issueDate } = req.body;
  await Certificate.findByIdAndUpdate(req.params.id, { userId, courseId, issueDate });
  res.redirect('/certificates');
});

// Start servera
app.listen(PORT, () => console.log(`🚀 Server radi na http://localhost:${PORT}`));
