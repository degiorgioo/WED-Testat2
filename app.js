var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./data/linksDatabase');
var userdatabase = require('./data/userDatabase');
var links = require('./routes/links');
var login = require('./routes/login');
var register = require('./routes/register');
var app = express();
var session = require('express-session');

//temporäre Links
//database.addNewLink("Test1", "http://www.google1.ch", "admin");
//database.addNewLink("Test2", "http://www.google2.ch", "admin");
//database.addNewLink("Test3", "http://www.google3.ch", "admin");

database.load();
userdatabase.load();

//set session
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}));

//routes
app.use('/login', login);
app.use('/', links);
app.use('/', register);

//set view engine with folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//to parse the body content of the request/response
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//to parse cookie
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
