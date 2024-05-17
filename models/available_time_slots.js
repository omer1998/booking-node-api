const sequelize = require("../db.js")
const {DataTypes} = require("sequelize")
const availableTimeSlot = () => sequelize.define("AvailabelTimeslot",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    doctor_id:{
        type:DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        references:{
            model:"doctors",
            key:"id"
        }

    },
    is_booked:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    start_time:{
        type:DataTypes.TIME,
        allowNull:false
    },
    end_time:{
        type:DataTypes.TIME,
        allowNull:false
    },
}, {
    timestamps: true,
    tableName: "available_timeslot"
})


module.exports = availableTimeSlot
