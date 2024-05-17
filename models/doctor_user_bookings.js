const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('doctor_user_bookings', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    doctor_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      unique: false
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      unique: false,

    },
    visit_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    // TODO: I may change this to add the visit start and end time for each patient
    // so the doctor is able to see the time for each patient
    visit_time: {
      type: DataTypes.TIME,
      allowNull: false
    }

  }, {
    sequelize,
    tableName: 'doctor_user_bookings',
    timestamps: true,
    // indexes: [
    //   {
    //     name: "PRIMARY",
    //     unique: true,
    //     using: "BTREE",
    //     fields: [
    //       { name: "id" },
    //     ]
    //   },
    // ]
  });
};
