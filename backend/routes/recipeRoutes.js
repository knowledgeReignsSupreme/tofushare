const express = require('express');
const router = express.Router();
const Recipe = require('../Models/recipeModel');
const User = require('../Models/userModel');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const {
  getRecipes,
  getRecipeById,
  postRecipe,
  getUnapprovedRecipes,
  approveRecipe,
  deleteRecipe,
  authorEditRecipe,
  editRecipeStatus,
} = require('../controllers/recipeController');

const { protect, isAdmin, isAuthor } = require('../middleware/authMiddleware');
const app = express();

router.route('/').get(getRecipes).post(protect, postRecipe);
router.put('/author', protect, isAuthor, authorEditRecipe);

router
  .route('/admin')
  .get(protect, isAdmin, getUnapprovedRecipes)
  .put(protect, isAdmin, approveRecipe)
  .delete(protect, isAdmin, deleteRecipe);

router.route('/:id').get(getRecipeById).put(protect, editRecipeStatus);

const PORT = process.env.PORT || 5001;

module.exports = router;
