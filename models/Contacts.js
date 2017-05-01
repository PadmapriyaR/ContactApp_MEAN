var mongoose = require('mongoose');

var contactschema = new mongoose.Schema({
  	"name": String,
  	"email": String,
   	"mobile": String,
    "work": String
});

module.exports = mongoose.model('contact', contactschema);