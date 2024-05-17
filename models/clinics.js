const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('clinics', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        clinic_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        working_hours: {
            type: DataTypes.INTEGER,
            defaultValue: 7,
            allowNull: false
        },
        clinic_start_time: {
            type: DataTypes.TIME,
            defaultValue: "15:00",
            allowNull: false
        },
        clinic_end_time: {
            type: DataTypes.TIME,
            defaultValue: "22:00",
            allowNull: false
        },
        patient_number_each_Day: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        appointment_duration: {
            type: DataTypes.TIME,
            allowNull:false,
            defaultValue: "00:15"
        },
        governorate: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        town: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        street_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        additional_address_info: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        clinic_phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "clinics_clinic_phone_unique"
        },
        clinic_email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: "clinics_clinic_email_unique"
        },
        clinic_photo_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        // doctor_id: {
        //     type: DataTypes.BIGINT.UNSIGNED,
        //     allowNull: false,
        //     references: {
        //         model: 'doctors',
        //         key: 'id'
        //     }
        // }
    }, {
        sequelize,
        tableName: 'clinics',
        timestamps: true,
        // indexes: [
        //     {
        //         name: "PRIMARY",
        //         unique: true,
        //         using: "BTREE",
        //         fields: [
        //             { name: "id" },
        //         ]
        //     },
        //     {
        //         name: "clinics_clinic_phone_unique",
        //         unique: true,
        //         using: "BTREE",
        //         fields: [
        //             { name: "clinic_phone" },
        //         ]
        //     },
        //     {
        //         name: "clinics_clinic_email_unique",
        //         unique: true,
        //         using: "BTREE",
        //         fields: [
        //             { name: "clinic_email" },
        //         ]
        //     },
        //     {
        //         name: "clinics_doctor_id_foreign",
        //         using: "BTREE",
        //         fields: [
        //             { name: "doctor_id" },
        //         ]
        //     },
        // ]
    });
};
