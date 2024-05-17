'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserInfo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserInfo.init({
        age: {
            type: DataTypes.INTEGER,
            allowNull:false
        },

        sex:{
            type:DataTypes.STRING,
            allowNull:false
        } ,
        profile_image:{
            type: DataTypes.STRING,
            allowNull:false
        }

    }, {
        sequelize,
        modelName: 'UserInfo',
        tableName: "user_info",
        timestamps: true,
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ["user_id"]
            }
        ]
    });
    return UserInfo;
};
