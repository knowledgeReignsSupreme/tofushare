const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./Models/userModel');
const Recipe = require('./Models/recipeModel');
const connectDB = require('./config/db');
const recipes = require('./DummyData');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Recipe.deleteMany();

    console.log('Data imported successfully');
    process.exit();
  } catch (err) {
    console.log(`[seeder.js] ${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Recipe.deleteMany();

    console.log('[DESTROY] Data destroyed successfully');
    process.exit();
  } catch (err) {
    console.log(`[seeder.js - DESTROY] ${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
