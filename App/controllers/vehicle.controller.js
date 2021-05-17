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
exports.create = (req, res) => {
    let user = req.session.user;
    let user_id = user.id;
    const vehicle = {
        user_id: user_id,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        vin: req.body.vin,
        license_plate: req.body.license_plate,
        toll_tag_number: req.body.toll_tag_number,
        insurance_expire: req.body.insurance_expire,
        registration_expire: req.body.registration_expire,
        purchase_mileage: req.body.purchase_mileage,
        oil_change_mileage: req.body.oil_change_mileage,
        tire_change_mileage: req.body.tire_change_mileage
    };

    Vehicle.create(vehicle)
        .then(data => {
            res.redirect('/vehicle');
        }).catch(err => {
            res.status(500).send({message: "Some error occurred while creating vehicle."})
        });    
};
exports.update = (req, res) => {
    const id = req.params.id;
    const vehicle = {
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        vin: req.body.vin,
        license_plate: req.body.license_plate,
        toll_tag_number: req.body.toll_tag_number,
        insurance_expire: req.body.insurance_expire,
        registration_expire: req.body.registration_expire,
        purchase_mileage: req.body.purchase_mileage,
        oil_change_mileage: req.body.oil_change_mileage,
        tire_change_mileage: req.body.tire_change_mileage
    };

    Vehicle.update(vehicle, {
        where: {id:id}
    })
    .then(data => {
        res.redirect('/vehicle');
    }).catch(err => {
        res.status(500).send({message: err.message})
    });    
};