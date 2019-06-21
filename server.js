const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');

const app = express();
const routes = require('./routes/index.routes');


//DB CONFIG
const db = require('./config/keys').mongoURI;


//Import Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'mails')));
app.use('/mails', express.static(path.join(__dirname, 'mails')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, 'menuImages')));
app.use('/menuImages', express.static(path.join(__dirname, 'menuImages')));
//Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('err', err));

app.use(logger('dev'));
app.set('trust proxy', 1);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use('/', routes);
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function errorHandler(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({ error: res.locals.message });
});

const port = process.env.PORT || 4001;

app.listen(port, () => console.log(`Server running on port ${port}`));
