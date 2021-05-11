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
