const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true 
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        // Store a reference of the `id` of the `Product` that owns this ProductTag
        model: 'product',
        key: 'id',
      },
    },
    tag_id: {
    type: DataTypes.INTEGER,
    reference: {
      // Store a reference of the `id` of the `Tag` that owns this ProductTag
      model: 'tag',
      key: 'id'
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
