const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const app = express();

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const restaurants = require('./routes/api/restaurants');
const restaurantsProfile = require('./routes/api/restaurants-profile');
const category = require('./routes/api/master/category');

//DB CONFIG
const db = require('./config/keys').mongoURI;

//CORS SET UP
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

//Import Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'mails')));
app.use('/mails', express.static(path.join(__dirname, 'mails')));

//Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('err', err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/restaurants', restaurants);
app.use('/api/restaurants-profile', restaurantsProfile);
app.use('/api/category', category);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 4001;

app.listen(port, () => console.log(`Server running on port ${port}`));
