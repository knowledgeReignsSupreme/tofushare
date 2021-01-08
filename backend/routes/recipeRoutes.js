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
  getUnapprovedRecipes,
  approveRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');

const { protect, isAdmin } = require('../middleware/authMiddleware');
const app = express();

router.get('/unapproved', protect, isAdmin, getUnapprovedRecipes);
router.put('/delete/:id', protect, isAdmin, deleteRecipe);
router.put('/approve/:id', protect, isAdmin, approveRecipe);
router.route('/').get(getRecipes).post(protect, postRecipe);
router.route('/:id').get(getRecipeById);
router.route('/:id/comments').post(protect, createRecipeComment);
router.put('/:id/cooked', protect, userCookedRecipe);
const PORT = process.env.PORT || 5001;

module.exports = router;
