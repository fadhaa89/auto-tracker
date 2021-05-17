module.exports = app => {
    const vehicles = require("../controllers/vehicle.controller.js");
    const router = require("express").Router();   
    const verify = require('./authGurd');

    //Get all
    router.get("/", verify, vehicles.all);
    //Delete by ID
    router.get("/delete/:id", verify,  vehicles.delete);
    //Create new
    router.post("/", verify, vehicles.create);
    //update by id
    router.post("/update/:id", verify, vehicles.update);

    app.use('/vehicle', router);
}