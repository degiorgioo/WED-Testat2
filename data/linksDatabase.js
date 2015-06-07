var storage = require('fs');
var storageFile = __dirname + '/linkDb.json';
var id=1000;

var database = {
    links: []
};

function saveDb() {
    var allLinks = JSON.stringify(database);
    storage.writeFile(storageFile, allLinks, function(err){
        if(err){
            alert(err);
        }
    });
}

function addNewLink(title, url, sender){
    database.links.push({
        title: title,
        url: url,
        id: id,
        ranking: 0,
        sender: sender,
        date: new Date()
    });
    id++;
    saveDb();
}

function loadDb(){
    try{
        var ac = JSON.parse(storage.readFileSync(storageFile, 'utf8'));
        database = ac;
    }catch(e){
    }
}

function getAllLinks(){
    return database.links;
}

function getLink(id){
    return database.links[searchIndex(id)];
}

function incrementRanking(id){
    database.links[searchIndex(id)].ranking++;
    saveDb();
}

function decrementRanking(id){
    database.links[searchIndex(id)].ranking--;
    saveDb();
}

function deleteLink(id){
    var tmpLinks = database.links;
    tmpLinks.splice(searchIndex(id), 1);
    database.links = tmpLinks;
    saveDb();
}

function searchIndex(index){
    for(var i = 0;i<database.links.length;i++) {
        if (database.links[i].id == index) {
            return i;
        }
    }
}

module.exports = {
    addNewLink : addNewLink,
    getAllLinks : getAllLinks,
    deleteLink : deleteLink,
    getLink : getLink,
    incRank: incrementRanking,
    decRank: decrementRanking,
    search: searchIndex,
    save: saveDb,
    load: loadDb
};
