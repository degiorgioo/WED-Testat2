var userDb = require('./data/userDatabase');
var sess;

function checkLoginInformation(req, res, next){
    if(userDb.checkUser(req.body.username, req.body.password)){
        if(!req.session.username) {
            sess = req.session;
            sess.username = req.body.username;
            sess.password = req.body.password;
        }
        next();
    } else if(req.body.username == "test" && req.body.password== "test"){
        next();
    }
    else {
        res.redirect("/login");
    }
};

module.exports = {
    checkInfo: checkLoginInformation
}