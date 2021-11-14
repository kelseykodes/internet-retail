// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongTo.Category
// Categories have many Products
Category.hasMany.Product
// Products belongToMany Tags (through ProductTag)
Product.belongToMany.ProductTag
// Tags belongToMany Products (through ProductTag)
Tags.belongToMany.ProductTag

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
