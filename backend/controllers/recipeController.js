const asyncHandler = require('express-async-handler');
const Recipe = require('../Models/recipeModel');

// *desc Fetch all recipes
// *route GET /api/recipes
// *access Public
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({});
  res.send(recipes);
});

// *desc Fetch single recipe
// *route GET /api/recipes/:id
// *access Public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: 'Recipe not found.' });
  }
});

exports.getRecipes = getRecipes;
exports.getRecipeById = getRecipeById;
