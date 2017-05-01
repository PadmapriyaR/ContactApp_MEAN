var express = require('express');
var app = express();
var mongoose = require('mongoose');
var contact = require('../models/Contacts');

//GET all the contacts
app.get('/contacts', function(req, res){
	contact.find(function(err, docs){
		if(err){
			handleError(res, err.message, "Failed to get contacts");
		}else{
			res.json(docs);
		}
	});
});

//POST contacts
app.post('/contacts', function(req, res){
	console.log('I am from post :', req.body);
	var newContact = req.body;
	contact.create(newContact, function(err, docs){
			console.log('inserted');
			res.json(docs);
		});
});

//GET by id
app.get('/contacts/:id', function(req, res){
	var id = req.params.id;
	console.log('id', id);
	contact.findOne({_id: id}, function(err, docs){
		if(err)
			return err;
		res.json(docs);
	});
});

//PUT
app.put('/contacts/:id', function(req, res){
	var body = req.body;
	console.log(body);
	contact.update({_id: req.params.id},body,function(err, docs){
		if(err)
			return err;
		res.json(docs);
	});
});

//DELETE
app.delete('/contacts/:id', function(req, res){
	var id = req.params.id;
	contact.remove({_id: id}, function(err, docs){
		if(err)
			return err;
		res.json(docs);
	});
});

module.exports = app;