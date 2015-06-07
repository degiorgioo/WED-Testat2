var express = require('express');
var register = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var userDb = require('../data/userDatabase');

register.get('/reg', function(req, res){
    res.render("register");
});

register.post('/reg', jsonParser , function(req, res){
    userDb.addUser(req.body.user, req.body.pass);
    res.send("user now registred");
});

module.exports = register;
