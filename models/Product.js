// Import necessary modules
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with database credentials from environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

// Define Category model
const Category = sequelize.define('Category', {
  category_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define Product model
const Product = sequelize.define('Product', {
  product_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    validate: {
      isNumeric: true
    }
  }
});

// Define Tag model
const Tag = sequelize.define('Tag', {
  tag_name: {
    type: DataTypes.STRING
  }
});

// Define ProductTag model
const ProductTag = sequelize.define('ProductTag', {});

// Establish associations between models
Category.hasMany(Product);
Product.belongsTo(Category);

Product.belongsToMany(Tag, { through: ProductTag });
Tag.belongsToMany(Product, { through: ProductTag });

// Sync models with the database
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  });

// Export models for use in other parts of the application
module.exports = { Category, Product, Tag, ProductTag, sequelize };

