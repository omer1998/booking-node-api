const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            // if you choose the id as universal unique identifier
            // type: DataTypes.UUID,
            // defaultValue: Sequelize.UUIDV4,

            // if integer autho increment
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING(255),
            allowNull: false,

        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validator: {
                notEmpty: true
            }

        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "users_email_unique"
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        remember_token: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        email_verified_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }, {
        sequelize,
        tableName: 'users',
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
                name: "users_email_unique",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "email" },
                ]
            },
        ]
    });
};

