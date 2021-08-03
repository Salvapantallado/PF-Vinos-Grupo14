const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("variety", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });
};