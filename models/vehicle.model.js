module.exports = (sequelize, Sequelize) => {
    const Vehicle = sequelize.define("vehicles", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        model: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        color: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        vin: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        license_plate: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        toll_tag_number: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        insurance_expire: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        purchase_mileage: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    });
};