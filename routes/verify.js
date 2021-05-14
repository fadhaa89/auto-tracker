module.exports =  function (req, res, next){
    
    console.log("not login"+req.session.user)
    if (req.session.user) {
        res.redirect('/vehicle');
    } else {
        next();
    } 
}