var express = require('express');
var session = require('express-session');
var login = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var auth = require('../authentification');
var checkAuth = auth.checkInfo;
var userDb = require('../data/userDatabase');
var database = require('../data/linksDatabase');

login.get('/', function(req, res){
    if(req.session.username && req.session.password){
        res.format({
            'text/plain': function(){
                res.send(database.getAllLinks());
            },
            'text/html': function(){
                res.render("index", {links: database.getAllLinks()});
            },
            'application/json': function(){
                res.json(database.getAllLinks());
            },
            'default': function() {
                res.render("index", {links: database.getAllLinks()});
            }
        })
    }else{
        res.render("login");
    }
});

login.post('/', jsonParser , checkAuth ,function(req, res){
    res.send("entrance");
});

console.log("login loaded");

module.exports = login;