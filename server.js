const express = require('express');
const sequelize = require('./config/connection')
const app = express();
const routes = require('./routes')
const PORT = process.env.PORT || 3000;



// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Use routes
app.use(routes)
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
