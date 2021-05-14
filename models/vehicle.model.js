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
    });
};