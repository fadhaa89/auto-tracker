module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const router = require("express").Router();   
    const verify = require('./verify');  
    const auth = require('./authGurd');

    //Sign Up
    router.get("/sign-up", verify, users.signUpForm);
    router.get("/login", verify, users.LoginForm);
    router.post("/login", verify, users.login);
    router.get("/logout", auth, users.logout);
    router.post("/", verify, users.create);
    router.get("/drivers", auth, users.all);
    app.use('/user', router);
}
