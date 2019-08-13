const express = require('express');
const router = express.Router();
const passport = require('passport');
const Users = require('../models/users');

router.get('/signin',(req, res, next)=>{
    ///console.log(error);
    res.render('signin', {head: 'Sign In'});
}).post('/signin', passport.authenticate('local', { 
    successRedirect: '/projects',
    failureRedirect: '/users/signin',
    failureFlash: true 
}));

router.get('/signup', (req, res, next)=>{
    res.render('signup', {head: 'Sign Up'});
})
.post('/signup', async (req, res, next)=>{
    const {username, email, password, pass_admin} = req.body;
    if (pass_admin != process.env.MASTERPASS){
        req.flash('error', ['Unauthorized: Wrong master password'])
        res.redirect('/users/signup')
        return
    }
    const user = new Users({username, email, password});
    user.password = await user.encrypPass(password);
    await user.save();
    res.redirect('/users/signin')
});

router.get('/signout', (req, res, next)=>{
    req.logout();
    res.redirect('/projects');
});

module.exports = router;