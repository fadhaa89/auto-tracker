const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
var sequelize;
if (process.env.NODE_ENV !== "production") {
    sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
    });
} else {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
}
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.vehicles = require("./vehicle.model.js")(sequelize, Sequelize);

db.vehicles.belongsTo(db.users, { foreignKey: "user_id", targetKey: "id" });

db.users.hasMany(db.vehicles);

module.exports = db;