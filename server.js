const app = require('express')()
const mongoose = require('mongoose')
const http = require('http').Server(app)
app.use(require('express').static('static'));

/* authentication handling */
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

/* session handling */
var session = require('express-session');
app.use(session({
  name: 'cookie_name',  // The name of the cookie
  secret:'secret',  // The secret requried for signing cookies
  resave: false,  // Force save of session for each request
  saveUninitialized: false // Save a session that is new, but no modified

}));
var sess;

/* Route to the home page*/
app.get('/', function(req, res){
  res.render('index.html');
});

http.listen(3030, function(){
	console.log('Server up on port 3030');
});