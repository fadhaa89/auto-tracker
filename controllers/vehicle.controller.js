const db = require("../models");
const User = db.users;
const Vehicle = db.vehicles;
const Op = db.Sequelize.Op;
exports.all = (req, res) => {    
    let user = req.session.user;
    let user_id = user.id;
    Vehicle.findAll({
        where: {
            user_id:user_id
        },
        raw: true,
    })
    .then(data =>{
        res.render('index',{title:'My Vehicle',results:data});
    }).catch(err =>{
        res.status(500).send({
            message: "Something went wrong"
        })
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Vehicle.destroy({
        where: {id}
       }).then(() => {
        res.redirect('/vehicle')
        //res.render('index',{title:'My Vehicle',results:data});
    });
};