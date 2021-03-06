const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("review", {
    score: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull:false
    },
    commentary: {
      type: DataTypes.TEXT,
    },
  });
};
