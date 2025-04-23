const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize } = require('./models');
const ProductRoutes = require('./routes/ProductRoutes');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api', ProductRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});


