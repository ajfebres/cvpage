const helpers = {};

helpers.isAuth = (req, res, next) =>{
    if (req.isAuthenticated()){
        return next();
    }else{
        res.render('unauthorized', {head: 'Unauthorized'});
    }
}

module.exports = helpers;