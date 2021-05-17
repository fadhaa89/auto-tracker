const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");

exports.all = (req, res) => {
    User.findAll({
            raw: true,
        })
        .then((data) => {
            res.render("users", { title: "Drivers", results: data });
        })
        .catch((err) => {
            res.status(500).send({
                message: "Something went wrong",
            });
        });
};
exports.signUpForm = (req, res) => {
    res.render("sign-up", { title: "Sign Up" });
};

exports.create = async(req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        address: req.body.address,
    };

    User.create(user)
        .then((data) => {
            const _user = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            };
            req.session.user = _user;
            console.log(req.session.user);
            res.redirect("/vehicle");
        })
        .catch((err) => {
            res.redirect("/user/sign-up");
        });
};
exports.LoginForm = (req, res) => {
    res.render("login", { title: "Sign In" });
};

exports.login = async(req, res) => {
    User.findOne({
            where: {
                email: req.body.email,
            },
        })
        .then(async(data) => {
            const validPassword = await bcrypt.compare(
                req.body.password,
                data.password
            );
            if (!validPassword) res.redirect("/user/login");

            const user = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            };

            req.session.user = user;
            res.redirect("/vehicle");
        })
        .catch((err) => {
            return res.status(400).send({
                message: "Invalid email or user does not exist",
            });
        });
};

exports.logout = (req, res) => {
    if (req.session.user) {
        req.session.user = null;
        res.clearCookie("user_id");
        res.redirect("/vehicle");
    } else {
        res.redirect("/user/login");
    }
};