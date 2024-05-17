const { DataTypes } = require("sequelize");
const sequelize = require("../db.js")
const doctor =  sequelize.define('doctor', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    speciality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    practising_from: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    professional_statment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "doctors_email_address_unique"
    },
    image_profile_url:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    // it is important to know the working days for each doctor in order to know which day allocated with specified time slots
    // working_days: {
    //     type: DataTypes.STRING,
    //     defaultValue: "[1,2,3,4,5]",
    //     allowNull:false
    // }
  }, {
    sequelize,
    tableName: 'doctors',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "doctors_email_address_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email_address" },
        ]
      },
    ]
  });

//   doctor.prototype.isWorkingDay = (day)=>{
//     return this.working_days.contains(day);
//   }

  module.exports = doctor
