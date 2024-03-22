const express = require('express');
const { Category, Product, Tag, ProductTag, sequelize } = require('./models');
const categoryRoutes = require('./routes/category-routes');
const productRoutes = require('./routes/product-routes');
const tagRoutes = require('./routes/tag-routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Use routes
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', tagRoutes);

// Start server and sync Sequelize models
sequelize.sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });
