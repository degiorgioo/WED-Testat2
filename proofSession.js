function requireSession(req, res, next){
    if(req.session.username && req.session.password){
        next();
    } else {
        res.redirect("/login");
    }
};

module.exports = {
    requireSession: requireSession
}