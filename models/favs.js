'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  favs.init({
    name: DataTypes.STRING,
    parkId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'favs',
  });
  return favs;
};