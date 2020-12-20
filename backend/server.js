const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
dotenv.config();
connectDB();

const app = express();

app.use('/api/recipes', recipeRoutes);
app.use('/api/upload', uploadRoutes);

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
