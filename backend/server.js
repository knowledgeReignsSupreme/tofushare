const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const userRoutes = require('./routes/userRoutes');
const morgan = require('morgan');

dotenv.config();
connectDB();

const limiter = rateLimit({
  windowMs: 10 * 60 * 10000,
  max: 100,
  message: 'Too many requests to the server, please try again later',
});
const app = express();
app.use(mongoSanitize());
app.use(helmet());
app.use(limiter);
app.use(hpp());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use('/api/recipes', recipeRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);

// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// app.use('/api/uploads', uploadRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    let url = path.join(__dirname, '../frontend/build', 'index.html');
    if (!url.startsWith('/app/')) {
      url = url.substring(1);
    }
    res.sendFile(url);
    // res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running..');
  });
}

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
