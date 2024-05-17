const {Sequelize} = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'mysql',
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: null,
    database: "new_booking_system",
    // define: {
    //     timestamps: false
    // }
  });

module.exports = sequelize;
