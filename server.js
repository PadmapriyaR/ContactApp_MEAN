//Add Mongoose and express
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

//Routing
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var contact = require('./route/contacts');
app.use('/api',contact);
app.use(express.static(path.join(__dirname, 'app')));


//Use native node promises
mongoose.Promise = global.Promise;

//Connect to mongodb
mongoose.connect('mongodb://contactsdb:contactsdb@ds127391.mlab.com:27391/contactsdb');

//Contacts API routes
	/*Generic error handler for all the apis listed below*/
function handleError(res, reason, message, code){
	console.log('Error:' + reason);
	res.status(code || 500).json({"error": message});
}

//Initialize app
app.listen(process.env.PORT || 8080);
console.log('Magic is happening on port 8080');