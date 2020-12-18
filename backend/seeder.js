const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./config/users');
const User = require('./Models/userModel');
const Recipe = require('./Models/recipeModel');
const connectDB = require('./config/db');
const recipes = require('./DummyData');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Recipe.deleteMany();
    await User.deleteMany();

    await User.insertMany(users);
    await Recipe.insertMany(recipes);

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
    await User.deleteMany();

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
