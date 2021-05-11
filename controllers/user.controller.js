const bcrypt        = require("bcryptjs");
const db            = require("../models");
const User          = db.users;
const jwt           = require('jsonwebtoken');
const randomstring  = require('randomstring');

exports.all = (req, res) => {
    User.findAll({
        raw: true,
    })
    .then(data =>{
        res.render('users',{title:'Drivers', results:data});
    }).catch(err =>{
        res.status(500).send({
            message: "Something went wrong"
        })
    });
};
exports.signUpForm = (req, res) => {
    res.render('sign-up',{title:'Sign Up'});
};

exports.create = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        address: req.body.address
    };

    User.create(user)
        .then(data => {
            const _user = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            };
            req.session.user = _user;
            res.redirect('/vehicle');
        }).catch(err => {
            res.redirect('/user/sign-up');
        });
    
};
