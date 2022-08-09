'use strict';

// soal 2
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hewan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  hewan.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: DataTypes.STRING,
    namaSpesies: DataTypes.STRING,
    umur: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'hewan',
    tableName: 'hewan'
  });
  return hewan;
};