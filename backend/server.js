const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');

dotenv.config();
connectDB();

const app = express();

app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
