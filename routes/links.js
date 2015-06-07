var express = require('express');
var links = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var database = require('../data/linksDatabase');
var proofSession = require('../proofSession');
var requireSession = proofSession.requireSession;

var sess;

//Get all
links.get('/', requireSession ,function(req, res) {
    res.format({
        'text/plain': function(){
            res.send(database.getAllLinks());
        },
        'text/html': function(){
            res.render("index", {links: database.getAllLinks(), usser: "test"});
        },
        'application/json': function(){
            res.json(database.getAllLinks(), {usser: "test"});
        },
        'default': function() {
            res.render("index", {links: database.getAllLinks(), usser: "testDave"});
        }
    });
});

//create new link
links.post('/', requireSession, jsonParser, function(req, res) {
    sess = req.session;
    database.addNewLink(req.body.titel, req.body.url, sess.username);
    res.sendStatus(200);
});

//delete link with :id
links.delete('/links/:id', requireSession, function(req) {
    database.deleteLink(req.params.id);
    res.sendStatus(200);
});


//Increment ranking of link
links.post('/links/:id/up', requireSession, function(req, res) {
    database.incRank(req.params.id);
    res.end();
});

//decrement ranking of link
links.post('/links/:id/down', requireSession, function(req, res) {
    database.decRank(req.params.id);
    res.sendStatus(200);
});

links.get('/logout', requireSession, function(req, res){
    req.session.destroy(function(err) {
        if(err){
            console.log(err);
        }
    });
});

links.post('/delete/:id', requireSession, function(req, res){
    database.deleteLink(req.params.id);
    res.sendStatus(200);
});


console.log("links loaded");

module.exports = links;