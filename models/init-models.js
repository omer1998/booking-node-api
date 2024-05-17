var DataTypes = require("sequelize").DataTypes;
var _clinics = require("./clinics");
var _doctor_user_bookings = require("./doctor_user_bookings");
var doctors = require("./doctors");
var _users = require("./users");
var _user_info = require("./user_info");
var _available_time_slots = require("./available_time_slots")

function initModels(sequelize) {
    var clinics = _clinics(sequelize, DataTypes);
    var doctor_user_bookings = _doctor_user_bookings(sequelize, DataTypes);
    // var doctors = _doctors(sequelize, DataTypes);
    var users = _users(sequelize, DataTypes);
    var user_info = _user_info(sequelize, DataTypes);
    var available_timeslot = _available_time_slots();

    doctors.hasOne(clinics, {
        foreignKey: {
            name: "doctor_id",
            allowNull: false
        }
    })
    clinics.belongsTo(doctors,
        {
            foreignKey: {
                name: "doctor_id",
                allowNull: false

            }
        })
    // you have to put the name for foriegn key in both tables if you want customized name as above
    // if i donot specify any name --> the foriegn key will be --> doctorId

    // doctor_clinics.belongsTo(clinics, { as: "clinic", foreignKey: "clinic_id" });
    // clinics.hasMany(doctor_clinics, { as: "doctor_clinics", foreignKey: "clinic_id" });
    // clinics.belongsTo(doctors, { as: "doctor", foreignKey: "doctor_id" });
    // doctors.hasMany(clinics, { as: "clinics", foreignKey: "doctor_id" });
    // doctor_clinics.belongsTo(doctors, { as: "doctor", foreignKey: "doctor_id" });
    // doctors.hasMany(doctor_clinics, { as: "doctor_clinics", foreignKey: "doctor_id" });
    // doctors
    // creating manay to many association between doctor and user aka patient using the already created table
    // doctor_user_bookings
    doctors.belongsToMany(users, { through: doctor_user_bookings, foreignKey: "doctor_id"});
    users.belongsToMany(doctors, { through: doctor_user_bookings, foreignKey: "user_id", unique: false });

    users.hasOne(user_info, {
        foreignKey: {
            name: "user_id",
            allowNull: false,
        }
    });

    user_info.belongsTo(users);

    return {
        clinics,

        doctor_user_bookings,
        doctors,
        users,
        user_info,
        available_timeslot
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
