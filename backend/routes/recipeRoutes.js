const express = require('express');
const router = express.Router();
const Recipe = require('../Models/recipeModel');
const User = require('../Models/userModel');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const {
  getRecipes,
  getRecipeById,
  createRecipeComment,
  userCookedRecipe,
  postRecipe,
} = require('../controllers/recipeController');

const protect = require('../middleware/authMiddleware');
const app = express();

router.route('/').get(getRecipes);
router.route('/:id').get(getRecipeById);
router.route('/:id/comments').post(protect, createRecipeComment);
router.put('/:id/cooked', protect, userCookedRecipe);
router.post('/', protect, postRecipe);

const PORT = process.env.PORT || 5001;

module.exports = router;
