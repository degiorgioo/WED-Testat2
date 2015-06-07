var storage = require('fs');
var storageFile = __dirname + '/userDb.json';
var id = 0;

var database = {
    users: []
};

function addNewUser(username, password){
    database.users.push({
        id: id,
        username: username,
        password: password
    });
    id++;
    saveDb();
}

function saveDb(){
    var json = JSON.stringify(database);
    storage.writeFile(storageFile, json , function( error ){
        if(error){
            alert(error);
        }
    });
}

function loadDb(){
    try{
        var ac = JSON.parse(storage.readFileSync(storageFile, 'utf8'));
        database = ac;
    }catch(e){
    }
}

function checkUser(username, password){
    var allowedUser = false;
    for(var i = 0; i < database.users.length; i++) {
        if(database.users[i].username === username && database.users[i].password === password){
            allowedUser = true;
        }
    }
    return allowedUser;
}

module.exports = {
    addUser: addNewUser,
    checkUser: checkUser,
    load: loadDb
};