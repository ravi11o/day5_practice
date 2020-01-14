// requires
var express = require('express');
var logger = require('morgan');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');

var port = process.env.PORT || 3000;

var User = require('./models/user');

// connect to mongodb database

mongoose.connect('mongodb://localhost/test',
{
  useNewUrlParser: true,
  useUnifiedTopology: true
},
 (err) => {
  console.log('connected', err ? false : true, err );
})


// instantiate the app
var app = express();

// middlewares
// implement logger
app.use(logger('dev'));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// routes
app.get('/', (req, res) => {
  res.send('welcome to express');
});

app.post('/', (req, res) => {
  res.send(req.body);
});

app.get('/projects', (req, res, next) => {
  res.render('projects', {name: 'puneet'});
});

app.post('/users/create', (req, res, next) => {
  var user = req.body;
  User.create(user, (err, createdUser) => {
    if(err) return next(err);
    // console.log(err, createdUser);
    res.json(createdUser);
  })
});

app.get('/users', (req, res, next) => {
  User.find({}, (err, usersList) => {
    if(err) return next(err);
    res.render('users', {users: usersList});
  })
  
})


// Error handler middlewares

// 1. user error
app.use((req, res, next) => {
  res.statusCode = 404;
  res.render('404');
})

// 2. server errors
app.use((err, req, res, next) => {
  res.statusCode = 500;
  res.send(err);
})

// add listener at last
app.listen(port, () => {
  console.log('server listening on port', port)
})